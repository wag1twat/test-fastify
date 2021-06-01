FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

RUN tsc

CMD [ "node", "build/app.js" ]