# Dockerfile

# base image
FROM node:14-alpine

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install
RUN npm rebuild node-sass

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start
