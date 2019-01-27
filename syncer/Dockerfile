# Councilbox Quorum Explorer SYNC DAEMON
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

FROM brunneis/python:3.7
MAINTAINER "Rodrigo Martínez" <rodrigo.martinez@councilbox.com>

################################################
# SYNC DAEMON
################################################

FROM brunneis/web3py
RUN \
    pip install \
        pymongo \
        easyweb3 \
        easysolc
COPY syncer.py /usr/local/bin/syncer.py
ENTRYPOINT ["syncer.py"]
