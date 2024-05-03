#!/usr/bin/bash
CURRENT_LOCATION=$(pwd)
cat modules.csv | while IFS="," read FOLDER PORT
do
    echo "Running $FOLDER"
    cd $FOLDER
    if [[ -f package.json ]]
    then
        pm2 start "yarn start" --name $FOLDER 
    fi
    cd $CURRENT_LOCATION
done

function handler(){
    pm2 kill
}

# Assign the handler function to the SIGINT signal
trap handler SIGINT