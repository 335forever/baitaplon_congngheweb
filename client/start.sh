#!/usr/bin/bash
CURRENT_LOCATION=$(pwd)
cat modules.csv | while IFS="," read FOLDER PORT
do
    echo "Running $FOLDER"
    cd $FOLDER
    if [[ -f package.json ]]
    then
        yarn install
        yarn start &
    fi
    cd $CURRENT_LOCATION
done