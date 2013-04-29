#!/bin/bash
PROJECT_DIRECTORY=`pwd`

PATH=$PATH:/usr/local/bin

echo -----------------------------------------------------------------------------
echo get all node packages for this project
echo -----------------------------------------------------------------------------
echo
cd "$PROJECT_DIRECTORY"
npm install

echo -----------------------------------------------------------------------------
echo set up configuration
echo -----------------------------------------------------------------------------
cd "$PROJECT_DIRECTORY"
cp /mnt/Projects/zoe-collector/fitbit-private.js ./fitbit-private.js

echo -----------------------------------------------------------------------------
echo run node unit tests
echo -----------------------------------------------------------------------------
mkdir "$PROJECT_DIRECTORY/test-results"
cd "$PROJECT_DIRECTORY"
mocha --recursive --reporter xunit > "$PROJECT_DIRECTORY/test-results/node-unit-tests.xml"

echo -----------------------------------------------------------------------------
echo something is putting junk warning messages in my mocha output
echo for now, just get rid of it, later need to find why this happens
echo -----------------------------------------------------------------------------
find . -type f -exec sed -i 's/\[Error: Symbol kerberos_module not found.\]//g' {} \;