FROM node:14-alpine
LABEL maintainer="onkarko"

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000", "--single"]
