FROM node:10.16.0-jessie

WORKDIR /usr/src/app

COPY server/* ./
COPY server/dist ./dist
RUN yarn install

EXPOSE 8080
CMD yarn run start
