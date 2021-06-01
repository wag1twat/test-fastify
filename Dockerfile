FROM node

# создание директории приложения
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install -g typescript

RUN npm install

# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY . .

RUN tsc

CMD [ "node", "dist/app.js" ]