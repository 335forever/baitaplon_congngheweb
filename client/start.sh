#!/usr/bin/bash

ls -l | grep -E -o "^d.+" | awk '{print $NF}'| while read FOLDER
do
    cd $FOLDER
    if [[ -f package.json ]]
    then
        yarn install
        pm2 start "yarn start" --name $FOLDER
    fi
    cd ..
done

function handler(){
    pm2 kill
}

# Assign the handler function to the SIGINT signal
trap handler SIGINT