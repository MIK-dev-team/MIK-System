#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER miksystem WITH SUPERUSER LOGIN PASSWORD 'nFzq2fNigeUmlpAn045FSff5adKsV0LHcBdsRRLhlMk';
    CREATE DATABASE miksystem_production;
    GRANT ALL PRIVILEGES ON DATABASE miksystem_production TO miksystem;
EOSQL