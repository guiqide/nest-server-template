FROM node:slim

WORKDIR /app
ADD . /app
ENV PATH="${PATH}:/sbin"
RUN apk update
RUN apk add --no-cache git
RUN npm install pm2 -g
RUN npm install
CMD npm run pm2 && tail -f /dev/null
EXPOSE 3000