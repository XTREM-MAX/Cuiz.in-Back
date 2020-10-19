FROM node:14.2

EXPOSE 3000

COPY . .

RUN npm install
RUN npm install typescript -g

RUN npm run tsc

CMD nmp start