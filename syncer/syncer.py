#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Councilbox Quorum Explorer HTTP API
# Copyright (C) 2018-2019 Rodrigo Martínez Castaño, Councilbox Technology, S.L.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import json
from hexbytes import HexBytes
import pymongo
from pymongo import MongoClient
import pymongo.errors
import logging
from web3 import Web3
from web3.middleware import geth_poa_middleware
import web3.exceptions
from os import environ
from bson import Int64
import time


class Filler:
    def connect_mongo(self):
        self.mongo_client = MongoClient(self.MONGO_HOST, self.MONGO_PORT)
        quorum = self.mongo_client.quorum
        self.blocks = quorum.blocks
        self.transactions = quorum.transactions
        self.accounts = quorum.accounts
        self.status = quorum.status

    def connect_quorum(self):
        self.w3 = Web3(Web3.HTTPProvider(self.QUORUM_ENDPOINT))
        # PoA compatibility middleware
        self.w3.middleware_stack.inject(geth_poa_middleware, layer=0)

    def _load_conf(self):
        try:
            self.QUORUM_ENDPOINT = environ['QUORUM_ENDPOINT']
        except KeyError:
            self.QUORUM_ENDPOINT = "http://localhost:22000"
        try:
            self.MONGO_HOST = environ['MONGO_HOST']
        except KeyError:
            self.MONGO_HOST = "mongodb"
        try:
            self.MONGO_PORT = environ['MONGO_PORT']
        except KeyError:
            self.MONGO_PORT = 27017

    def __init__(self):
        # Environment variables
        self._load_conf()

        # Create connections
        self.connect_quorum()
        self.connect_mongo()

        # Create indexes
        self.blocks.create_index('hash',
                                 unique=True,
                                 background=True)
        self.blocks.create_index('number',
                                 unique=True,
                                 background=True)

        self.transactions.create_index('hash',
                                       unique=True,
                                       background=True)
        self.transactions.create_index('blockHash',
                                       background=True)
        self.transactions.create_index('blockNumber',
                                       background=True)
        self.transactions.create_index('from',
                                       background=True)
        self.transactions.create_index('to',
                                       background=True)

        self.accounts.create_index('address',
                                   unique=True,
                                   background=True)
        # For contracts
        self.accounts.create_index('creationTransaction',
                                   background=True)

    @staticmethod
    def get_serializable_dict(input_dict):
        serializable_dict = {}
        for key, value in input_dict.items():
            if type(value) == list and len(value) and type(value[0]) == HexBytes:
                value = [tx.hex() for tx in value]
            if key == 'logs':
                value = [Filler.get_serializable_dict(item) for item in value]
            if type(value) == HexBytes:
                value = value.hex()
            serializable_dict[key] = value
        return serializable_dict

    def get_block_data(self):
        block_dict = Filler.get_serializable_dict(
            self.w3.eth.getBlock(self.current_status['block_height']))

        block_dict['difficulty'] = Int64(block_dict['difficulty'])
        # Overflow with gasLimit
        block_dict['gasLimit'] = str(block_dict['gasLimit'])
        block_dict['gasUsed'] = str(block_dict['gasUsed'])
        block_dict['number'] = Int64(block_dict['number'])
        block_dict['size'] = Int64(block_dict['size'])
        block_dict['timestamp'] = Int64(block_dict['timestamp'])
        block_dict['totalDifficulty'] = Int64(block_dict['totalDifficulty'])

        block_dict['extraData'] = block_dict.pop('proofOfAuthorityData')
        block_dict['receiptRoot'] = block_dict.pop('receiptsRoot')
        return block_dict

    def get_tx_data(self, tx_hash):
        tx_dict = Filler.get_serializable_dict(
            self.w3.eth.getTransaction(tx_hash))
        tx_dict = {key: tx_dict[key] for key in \
            ['hash',
             'nonce',
             'value',
             'gasPrice',
             'gas',
             'input',
             'r',
             's',
             'v']}

        tx_receipt_dict = Filler.get_serializable_dict(
            self.w3.eth.getTransactionReceipt(tx_hash))
        tx_receipt_dict = {key: tx_receipt_dict[key] for key in \
            ['blockHash',
             'blockNumber',
             'transactionIndex',
             'from',
             'to',
             'gasUsed',
             'cumulativeGasUsed',
             'logs',
             'logsBloom',
             'contractAddress']}

        if not tx_receipt_dict['contractAddress']:
            tx_receipt_dict.pop('contractAddress')
        else:
            tx_receipt_dict.pop('to')
            tx_receipt_dict['contractAddress'] = \
                tx_receipt_dict['contractAddress'].lower()

        tx_dict.update(tx_receipt_dict)

        tx_dict['nonce'] = Int64(tx_dict['nonce'])
        tx_dict['value'] = Int64(tx_dict['value'])
        tx_dict['gasPrice'] = Int64(tx_dict['gasPrice'])
        tx_dict['gas'] = str(tx_dict['gas'])
        tx_dict['blockNumber'] = Int64(tx_dict['blockNumber'])
        tx_dict['gasUsed'] = str(tx_dict['gasUsed'])
        tx_dict['cumulativeGasUsed'] = str(tx_dict['cumulativeGasUsed'])

        return tx_dict

    def insert_block(self):
        try:
            block = self.get_block_data()
        except AttributeError:
            return False

        try:
            self.blocks.update_one({'number': block['number']},
                                   {'$set': block},
                                   upsert=True)
        except Exception as e:
            logging.error('Error writing a block...\n' + str(block))
            logging.exception("message")

        for tx_hash in block['transactions']:
            self.insert_tx(tx_hash)

        return True

    def update_account(self, address, creation_tx=None):
        address = address.lower()

        if creation_tx:
            logging.info(f' [+] Updating contract {address}...')
        else:
            logging.info(f' [+] Updating account {address}...')

        account = self.accounts.find_one({'address': address})
        transactions = 0
        if account:
            transactions = account['transactions']

        # Savepoint for the current account state
        previous_state = {'address': address, 'transactions': transactions}
        self.current_status['previous_accounts_state'] \
            .append(previous_state)

        self.update_remote_current_status()

        balance = self.w3.eth.getBalance(Web3.toChecksumAddress(address))
        balance = str(balance)
        transactions += 1
        account = {'address': address,
                   'transactions': transactions,
                   'balance': balance}
        if creation_tx:
            account['creationTransaction'] = creation_tx

        self.accounts.update_one({'address': address},
                                 {'$set': account},
                                 upsert=True)

    def insert_tx(self, tx_hash):
        logging.info(f' [+] Inserting tx {tx_hash}...')
        tx = self.get_tx_data(tx_hash)

        try:
            self.transactions.update_one({'hash': tx_hash},
                                         {'$set': tx},
                                         upsert=True)
            # Update accounts
            if 'contractAddress' in tx and tx['contractAddress']:
                self.update_account(tx['contractAddress'], tx_hash)
            elif 'to' in tx and tx['to']:
                self.update_account(tx['to'])
            self.update_account(tx['from'])

        except Exception as e:
            logging.error('Error writing a tx...\n' + str(tx))
            logging.exception("message")

    def update_remote_current_status(self):
        self.status.update_one({}, {'$set': self.current_status}, upsert=True)


if __name__ == '__main__':
    logging.getLogger().setLevel(logging.INFO)

    filler = Filler()
    filler.current_status = filler.status.find_one({})
    if not filler.current_status:
        filler.current_status = {
            'block_height': 0,
            'completed': False,
            'previous_accounts_state': []}
        filler.status.insert_one(filler.current_status)
        filler.update_remote_current_status()

    if not filler.current_status['completed'] and filler.current_status['block_height'] > 0:
        logging.info("Rollback...")
        # Rollback to the previous account states
        for account in filler.current_status['previous_accounts_state']:
            balance = filler.w3.eth.getBalance(Web3.toChecksumAddress(account['address']))
            balance = str(balance)
            account['balance'] = balance
            filler.accounts.update_one({'address': account['address']},
                                       {'$set': account},
                                       upsert=True)
        filler.current_status['previous_accounts_state'] = []
        filler.update_remote_current_status()

    running = True
    while(running):
        try:
            logging.info(f"Requesting block {filler.current_status['block_height']}...")
            if not filler.insert_block():
                time.sleep(1)
                continue

            # Mark block as completed
            filler.current_status['completed'] = True
            filler.current_status['previous_accounts_state'] = []
            filler.update_remote_current_status()

            # Mark the next block as not completed
            filler.current_status['block_height'] += 1
            filler.current_status['completed'] = False
            filler.update_remote_current_status()

        except Exception as e:
            logging.exception("message")
            time.sleep(1)

            # Mongo error
            if e.__class__.__name__ in dir(pymongo.errors):
                filler.connect_mongo()
            # Web3 error
            elif e.__class__.__name__ in dir(web3.exceptions):
                filler.connect_quorum()
