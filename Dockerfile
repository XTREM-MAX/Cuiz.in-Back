FROM node:14.2

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install
RUN npm install typescript -g

RUN tsc

CMD nmp start