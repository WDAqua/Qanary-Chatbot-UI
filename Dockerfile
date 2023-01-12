# build stage
FROM node:lts-alpine as build-stage

ARG PUBLIC_URL
ARG DEFAULT_LANGUAGE
ARG CHATBOT_FRONTEND_URL
ARG DEFAULT_CHATBOT_BACKEND_URL
ARG DEFAULT_CHATBOT_COMPONENTS
ARG INITIAL_QUESTION_PARAMETER_NAME
ARG DEFAULT_BACKEND_TYPE

WORKDIR /app
COPY ./package*.json ./

RUN npm ci

COPY . ./
RUN PUBLIC_URL="$CHATBOT_FRONTEND_URL" npm run build

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