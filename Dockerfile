from mhart/alpine-node:8.15.1

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
  && npm install --silent \
  && apk del .build-deps

WORKDIR /code

COPY . .

CMD [ "npm", "start" ]
