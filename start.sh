#! /bin/sh

nginx -g "daemon off;" &
echo "@@@@"
cd /usr/src/app
npm start
