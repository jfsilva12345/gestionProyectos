FROM node:16    

#create app directory
WORKDIR /usr/src/app

#install app dependencies
#A wildcard is used to ensure both package.jsn AND package-lock.json are copied
#where available (npm@5+)
COPY package.json ./

RUN yarn

COPY . .

EXPOSE 4000
CMD ["node", "src/index.js"]
