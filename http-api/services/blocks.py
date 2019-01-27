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

from flask import Flask, request
from flask_restful import Resource
import logging
from pymongo import MongoClient
from services.utils import (
    get_clean_block,
    get_output,
)
from os import environ


class Block(Resource):
    def __init__(self, conf):
        self.mongo_client = MongoClient(conf.mongo['address'],
                                        conf.mongo['port'])
        self.database = self.mongo_client.quorum
        try:
            self.extra_data_format = environ['EXTRA_DATA_FORMAT']
        except KeyError:
            self.extra_data_format = None

    def get(self):
        value = request.args.get('value', type=str)
        try:
            value = int(value)
            field = 'number'
        except ValueError:
            field = 'hash'
            if len(value) != 66:
                return {}, 400

        block = self.database.blocks.find_one({field: value})
        if block:
            block = get_clean_block(block, self.extra_data_format)
            return get_output(block, 'block'), 200
        return {}, 404


class Blocks(Resource):
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
        from_ = request.args.get('from', type=int)
        if from_:
            if order == 'desc':
                query['number'] = {'$lt': from_}
                order = -1
            elif order == 'asc':
                query['number'] = {'$gt': from_}
                order = 1
        else:
            order = -1

        collection = self.database.blocks
        result = collection.find(query, sort=[('number', order)]).limit(limit)
        blocks = []
        for block in result:
            blocks.append({'timestamp': block['timestamp'],
                           'number': block['number'],
                           'hash': block['hash'],
                           'transactions': len(block['transactions'])})
                           
        # Reverse list if asc
        if order == 1:
            blocks = blocks[::-1]

        return get_output(blocks, 'latest blocks'), 200
