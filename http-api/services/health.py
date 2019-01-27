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
from web3 import Web3


class Health(Resource):
    def __init__(self, conf):
        logging.getLogger().setLevel(logging.INFO)
        self.conf = conf

    def get_mongo_status(self):
        try:
            mongo_client = MongoClient(self.conf.mongo['address'],
                                       self.conf.mongo['port'])
            mongo_client.server_info()
        except Exception:
            return 'DOWN'
        return 'UP'

    def get_quorum_status(self):
        w3 = Web3(Web3.HTTPProvider(self.conf.quorum['endpoint']))
        if w3.isConnected():
            return 'UP', w3.version.node
        return 'DOWN', '/Disconnected/'

    def get(self):
        quorum_status = self.get_quorum_status()
        return {
            'status': quorum_status[0],
            'node': {
                'status': quorum_status[0],
                'version': quorum_status[1]
            }
        }, 200
