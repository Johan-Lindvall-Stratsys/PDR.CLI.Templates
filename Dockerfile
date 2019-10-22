FROM node:10.16-alpine as build
WORKDIR /usr/src/app
COPY server/. .
RUN yarn install --production

FROM node:10.16-alpine as release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/. .
EXPOSE 8080
CMD yarn run start
