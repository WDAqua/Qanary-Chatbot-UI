# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./package*.json ./

RUN npm ci

COPY . ./
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

#RUN mkdir /etc/nginx/certs
COPY ./docker/certs /etc/nginx/certs
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]