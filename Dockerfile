FROM node:lts

WORKDIR /app
ADD . /app
ENV PATH="${PATH}:/sbin"
RUN yum update
RUN yum install git
RUN npm install pm2 -g
RUN npm install
CMD npm run pm2 && tail -f /dev/null
EXPOSE 3000