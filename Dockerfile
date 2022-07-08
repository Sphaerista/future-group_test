# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /future-group_test
COPY . .
RUN npm install
CMD ["npm", "start"]