﻿FROM node:14.15.0-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json  /app
RUN npm install
COPY . /app
RUN node_modules/.bin/ng build --configuration production
# RUN ng build --prod

# FROM nginx:1.17-alpine
# COPY nginx.config /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/dist /usr/share/nginx/html

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
