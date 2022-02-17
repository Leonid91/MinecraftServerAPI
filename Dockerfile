FROM node:16.14.0

WORKDIR /MinecraftServerAPI

COPY package*.json /MinecraftServerAPI/

RUN npm install express
RUN npm install rcon
RUN npm install

COPY back/app.js /MinecraftServerAPI/back/app.js

EXPOSE 3000
CMD [ "node", "/MinecraftServerAPI/back/app.js" ]