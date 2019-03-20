FROM node:lts-stretch

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY . ./

RUN npm run build

COPY ./config ./build/config

ENV NODE_ENV prod

ENV TZ 'Europe/Brussels'

EXPOSE 3000

CMD ["npm", "run", "nbstart"]