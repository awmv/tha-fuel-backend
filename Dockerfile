FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install

CMD npm start serve
