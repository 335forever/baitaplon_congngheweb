@echo off
SETLOCAL EnableDelayedExpansion

set "CURRENT_LOCATION=%cd%"
for /F "tokens=1,2 delims=," %%A in (modules.csv) do (
    echo Running %%A
    cd /d "./%%A"
    echo %cd%
    if exist package.json (
        yarn install
        start "" yarn start:standalone
    )
    cd %CURRENT_LOCATION%
)

ENDLOCAL
