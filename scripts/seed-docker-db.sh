#!/usr/bin/env bash

docker exec -it -w /var/data mongo sh -c "/usr/bin/mongoimport --db mdbw19 --file ./weather_data.json"