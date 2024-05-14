@echo off
SETLOCAL EnableDelayedExpansion

start /b "" sass "styleguide/src/fonts.scss" "styleguide/src/fonts.css"
start /b "" npx tailwindcss-cli build "styleguide/src/tailwind.css" -o "styleguide/src/global.css"

set "CURRENT_LOCATION=%cd%"
for /F "tokens=1,2 delims=," %%A in (modules.csv) do (
    echo Running %%A
    cd /d "%%A"
    echo %cd%
    if exist package.json (
        yarn install
        start "" yarn start:standalone
    )
    cd %CURRENT_LOCATION%
)

"$chrome" --app="localhost:9000" --disable-web-security --user-data-dir="C:\my-chrome-data"

ENDLOCAL
