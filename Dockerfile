FROM node:14.2

EXPOSE 3000

COPY . .

RUN npm install
RUN npm install typescript sass

RUN tsc

CMD nmp start