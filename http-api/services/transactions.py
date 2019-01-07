#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Councilbox Quorum Explorer HTTP API
# Copyright (C) 2018 Rodrigo Martínez Castaño, Councilbox Technology, S.L.
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

from flask import Flask, request
from flask_restful import Resource
import logging
from pymongo import MongoClient
from bson import ObjectId
from services.utils import (
    clean_transaction,
    get_clean_transaction_row,
    get_output,
)
from web3 import Web3


class Transaction(Resource):
    def __init__(self, conf):
        self.mongo_client = MongoClient(conf.mongo['address'],
                                        conf.mongo['port'])
        self.database = self.mongo_client.quorum

    def get(self):
        value = request.args.get('value', type=str)
        if not value:
            return {}, 400

        transaction = self.database.transactions.find_one({'hash': value})
        if transaction:
            clean_transaction(transaction)

            # Retrieve the timestamp of block it belongs to
            block_hash = transaction['blockHash']
            block = self.database.blocks.find_one({'hash': block_hash})
            block_timestamp = block['timestamp']
            transaction['timestamp'] = block_timestamp

            return get_output(transaction, 'transaction'), 200
        return {}, 404


class Transactions(Resource):
    def __init__(self, conf):
        self.mongo_client = MongoClient(conf.mongo['address'],
                                        conf.mongo['port'])
        self.database = self.mongo_client.quorum

    def get(self):
        limit = request.args.get('limit', type=int, default=25)
        if limit < 1:
            limit = 25
        elif limit > 50:
            limit = 50

        query = {}

        order = request.args.get('order', type=str, default='desc')
        from_ = request.args.get('from', type=ObjectId)
        if from_:
            if order == 'desc':
                query['_id'] = {'$lt': from_}
                order = -1
            elif order == 'asc':
                query['_id'] = {'$gt': from_}
                order = 1
        else:
            order = -1

        address = request.args.get('address', type=str)
        if address:
            # Normalize hash
            address = address.lower()
            query['$or'] = [{'from': address}, {'to': address}, {'contractAddress': address}]

        block = request.args.get('block', type=str)
        if block:
            # Block hash
            if len(block) == 66:
                # Normalize hash
                block = block.lower()
                query['blockHash'] = block
            else:
                try:
                    block = int(block)
                    query['blockNumber'] = block
                except ValueError:
                    return {}, 400

        result = self.database.transactions.find(
            query, sort=[('_id', order)]).limit(limit)

        block_timestamps = {}
        transactions = []
        for transaction in result:
            block = self.database.blocks.find_one({'number': transaction['blockNumber']})
            if not block['number'] in block_timestamps:
                block_timestamps[block['number']] = block['timestamp']
            transaction['timestamp'] = block_timestamps[transaction['blockNumber']]
            transaction = get_clean_transaction_row(transaction)
            transactions.append(transaction)

        # Reverse list if asc
        if order == 1:
            blocks = blocks[::-1]

        return get_output(transactions, 'latest transactions'), 200
