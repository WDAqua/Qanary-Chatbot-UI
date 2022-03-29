# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./package*.json ./

RUN npm ci

COPY . ./
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/build .

#COPY ./docker/certs /etc/nginx/certs
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]