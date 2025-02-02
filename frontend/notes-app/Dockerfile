FROM node:23.1.0-alpine3.20
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN chown -R node:node /home/node/app
USER node
RUN npm install
COPY --chown=node:node . .
ENV NODE_DEBUG=http,http2
EXPOSE 8080
CMD [ "npm", "run", "dev" ]
