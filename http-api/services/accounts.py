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
    get_clean_account,
    get_output,
)


class Account(Resource):
    def __init__(self, conf):
        self.mongo_client = MongoClient(conf.mongo['address'],
                                        conf.mongo['port'])
        self.database = self.mongo_client.quorum

    def get(self):
        value = request.args.get('value', type=str)
        if not value:
            return {}, 400

        # Normalize hash
        value = value.lower()
        account = self.database.accounts.find_one({'address': value})
        if not account:
            return {}, 404

        account = get_clean_account(account)
        return get_output(account, 'account'), 200

class Accounts(Resource):
    def __init__(self, conf):
        raise NotImplementedError
