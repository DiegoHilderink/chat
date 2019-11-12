#!/bin/sh

psql -h localhost -U usuario -d datos < data/tables.sql
