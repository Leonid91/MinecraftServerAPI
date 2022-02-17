FROM node:16.14.0

WORKDIR /MinecraftServerAPI

COPY package.json /MinecraftServerAPI/package.json

RUN npm install

COPY back/app.js /MinecraftServerAPI/back/app.js

CMD ["node /MinecraftServerAPI/back/app.js"]