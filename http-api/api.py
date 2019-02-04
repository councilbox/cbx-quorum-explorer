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

import yaml
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
from services import (
    health,
    blocks,
    transactions,
    accounts,
    search,
)
from conf import conf_loader as conf
import logging


logging.getLogger().setLevel(logging.INFO)
app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(blocks.Blocks,
                 conf.api['base_url'] + '/blocks',
                 resource_class_kwargs={'conf': conf})

api.add_resource(blocks.Block,
                 conf.api['base_url'] + '/block',
                 resource_class_kwargs={'conf': conf})

api.add_resource(transactions.Transactions,
                 conf.api['base_url'] + '/transactions',
                 resource_class_kwargs={'conf': conf})

api.add_resource(transactions.Transaction,
                 conf.api['base_url'] + '/transaction',
                 resource_class_kwargs={'conf': conf})

api.add_resource(accounts.Account,
                 conf.api['base_url'] + '/account',
                 resource_class_kwargs={'conf': conf})

api.add_resource(search.Search,
                 conf.api['base_url'] + '/search',
                 resource_class_kwargs={'conf': conf})

api.add_resource(health.Health,
                 conf.api['base_url'] + '/status',
                 resource_class_kwargs={'conf': conf})


if __name__ == "__main__":
    app.run(host=conf.api['bind_address'],
            port=conf.api['port'],
            threaded=True)
