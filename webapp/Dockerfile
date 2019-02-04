# Quorum Explorer WebApp Container
# Copyright (C) 2018-2019 Rodrigo Martínez <rodrigo.martinez@councilbox.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

FROM node
MAINTAINER "Rodrigo Martínez" <rodrigo.martinez@councilbox.com>

################################################
# ALASTRIA EXPLORER WEBAPP
################################################

ENV APP_PATH /opt/webapp
RUN mkdir /opt/webapp

COPY package.json $APP_PATH
COPY public $APP_PATH/public
COPY src $APP_PATH/src

RUN \
    npm install -g serve \
    && cd $APP_PATH \
    && npm install \
    && npm run build --production

WORKDIR $APP_PATH
COPY entrypoint.sh /usr/bin
ENTRYPOINT ["entrypoint.sh"]
