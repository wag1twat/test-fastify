FROM node:15-alpine

RUN apk update && apk add python make g++

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./


RUN npm install

COPY . .

CMD [ "node", "build/app.js" ]