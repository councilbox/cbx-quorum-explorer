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

from catenae import Link
from synced import svalue
from os import environ
import datetime


class Metrics(Link):
    def setup(self):
        self.mongodb.set_defaults('quorum')
        self.mongodb.create_index('month_id', collection_name='monthly_metrics')
        self.mongodb.create_index('year', collection_name='monthly_metrics')
        self.mongodb.create_index('month', collection_name='monthly_metrics')

        self.last_block = svalue('last_block')
        if self.last_block.get() is None:
            self.last_block.set(0)
        self.loop(self.process_blocks, interval=10)

    def process_blocks(self):
        query = {'number': {'$gt': self.last_block.get()}}
        for block in self.mongodb.get(query, collection_name='blocks'):
            timestamp = block['timestamp']
            txs_no = len(block['transactions'])
            self.logger.log(f"{block['number']} ({txs_no} txs)")

            self.update_monthly_txs(timestamp, txs_no)
            self.last_block.set(block['number'])

    @staticmethod
    def get_month_id(timestamp):
        timestamp = int(timestamp)
        try:
            date = datetime.datetime.fromtimestamp(timestamp)
        except ValueError:
            date = datetime.datetime.fromtimestamp(timestamp / 1000)

        month_id = f"{date.year}{str(date.month).rjust(2, '0')}"
        return month_id

    def update_monthly_txs(self, timestamp, txs_no):
        month_id = Metrics.get_month_id(timestamp)
        query = {'month_id': month_id}

        try:
            result = next(self.mongodb.get(query, collection_name='monthly_metrics'))
        except StopIteration:
            result = None

        old_txs_no = 0
        if result is not None:
            old_txs_no = result['txs_no']

        new_txs_no = old_txs_no + txs_no
        value = {'txs_no': new_txs_no, 'year': int(month_id[2:]), 'month': int(month_id[:2])}
        self.mongodb.update(query, value, collection_name='monthly_metrics')


try:
    MONGO_HOST = environ['MONGO_HOST']
except KeyError:
    MONGO_HOST = "mongodb"
try:
    MONGO_PORT = environ['MONGO_PORT']
except KeyError:
    MONGO_PORT = 27017

Metrics(mongodb_endpoint=f'{MONGO_HOST}:{MONGO_PORT}').start()