FROM node:13.8.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN HUSKY_SKIP_INSTALL=1 npm ci --no-progress
RUN npm run build

CMD ["node", "dist/main"]

EXPOSE 3000
