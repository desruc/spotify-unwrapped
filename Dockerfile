# dependencies layer
FROM node:10.15.3-alpine AS dependencies
WORKDIR /app
COPY ./package.json .
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:10.15.3-alpine
WORKDIR /app
RUN npm install express
COPY --from=dependencies /app/build .
COPY ./server.js .

CMD ["node", "index.js"]
