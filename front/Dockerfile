# pull official base image
FROM node:16

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn

# add app
COPY . .


EXPOSE 3000
# start app
CMD ["yarn", "start"]
