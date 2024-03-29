FROM node:lts-alpine

WORKDIR /app
ADD . /app
RUN apk update
RUN apk add git
RUN apk add vim
RUN npm install pm2 -g
RUN npm install
CMD npm run pm2 && tail -f /dev/null
EXPOSE 3000