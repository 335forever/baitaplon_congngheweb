#!/usr/bin/bash

cat modules.csv | while IFS="," read FOLDER PORT
do
    echo "Running $FOLDER"
    cd $FOLDER
    if [[ -f package.json ]]
    then
        yarn install
        pm2 start yarn --name $FOLDER -- start:standalone 
    fi
    cd ..
done

function handler(){
    pm2 kill
}

# Assign the handler function to the SIGINT signal
trap handler SIGINT