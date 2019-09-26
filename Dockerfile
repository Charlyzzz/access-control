FROM arm32v7/node:10.16.3-jessie
WORKDIR /usr/access-control 
COPY . /usr/access-control/
RUN npm install 
CMD [ "node", "index.js" ]


