#! /bin/bash
yarn build:server
heroku container:push --app=infinite-cove-14572 web
heroku container:release --app=infinite-cove-14572 web
# docker build -t benawad/abb:latest .
# docker push benawad/abb:latest
# ssh root@167.99.11.233 "docker pull benawad/abb:latest && docker tag benawad/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"