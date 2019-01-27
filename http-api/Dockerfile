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

FROM brunneis/python:3.7
MAINTAINER "Rodrigo Martínez" <rodrigo.martinez@councilbox.com>

################################################
# HTTP API + ISTANBUL TOOLS
################################################

ENV \
  GO_VERSION=1.10.3 \
  GO_CHECKSUM=fa1b0e45d3b647c252f51f5e1204aba049cde4af177ef9f2181f43004f901035

RUN \
    apt-get -y update \
    && dpkg-query -Wf '${Package}\n' | sort > init_pkgs \
    && apt-get -y install \
        wget \
        git \
        build-essential \
    && dpkg-query -Wf '${Package}\n' | sort > new_pkgs \
    && wget -O go.tgz https://dl.google.com/go/go$GO_VERSION.linux-amd64.tar.gz \
    && echo "$GO_CHECKSUM go.tgz" | sha256sum -c - \
    && tar -C /usr/local -xzf go.tgz \
    && rm go.tgz \
    && /usr/local/go/bin/go get github.com/getamis/istanbul-tools/cmd/istanbul

RUN \
    pip install --upgrade pip \
    && pip install \
        web3==4.6.0 \
        pymongo \
        pyyaml \
        flask \
        flask-restful \
        flask_cors \
        gunicorn \
        easyweb3 \
        easysolc \
    && apt-get -y purge $(diff -u init_pkgs new_pkgs | grep -E "^\+" | cut -d + -f2- | sed -n '1!p') \
    && apt-get clean

ADD http-api.tar.gz /opt/docker
EXPOSE 8080
ENV PATH=/usr/local/go/bin:/root/go/bin:$PATH
WORKDIR /opt/docker
ENTRYPOINT ["gunicorn", "-w", "8", "--bind", "0.0.0.0:8080", "api:app"]
