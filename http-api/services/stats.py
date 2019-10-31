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
from easyweb3 import EasyWeb3
import signal


class YearlyStats(Resource):
    def __init__(self, conf):
        logging.getLogger().setLevel(logging.INFO)
        self.mongo_client = MongoClient(conf.mongo['address'], conf.mongo['port'])
        self.database = self.mongo_client.quorum

    def get(self, year):
        stats = []
        for stat in self.database.monthly_metrics.find({'year': int(year)}):
            stat.pop('_id')
            stat.pop('year')
            stat.pop('month_id')
            stats.append(stat)
        
        http_code = 200
        if not stats:
            http_code = 404
        return {year: stats}, http_code


class MonthlyStats(Resource):
    def __init__(self, conf):
        logging.getLogger().setLevel(logging.INFO)
        self.mongo_client = MongoClient(conf.mongo['address'], conf.mongo['port'])
        self.database = self.mongo_client.quorum

    def get(self, year, month):
        month_id = f"{year}{str(month).rjust(2, '0')}"
        stat = self.database.monthly_metrics.find_one({'month_id': month_id})
        if stat:
            stat.pop('_id')
            stat.pop('year')
            stat.pop('month')
            stat.pop('month_id')
            return stat
        else:
            return {}, 404