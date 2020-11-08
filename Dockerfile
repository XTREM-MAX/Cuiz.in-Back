FROM node:14.2-alpine

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install
RUN npm install typescript -g

RUN npm build

CMD npm start