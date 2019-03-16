FROM node:lts-stretch

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY . ./

RUN npm run build

ENV NODE_ENV production

ENV TZ "Europe/Brussels"

EXPOSE 3000

CMD ["npm", "run", "nbstart"]
