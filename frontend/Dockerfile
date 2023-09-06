# nodejs version 18 using alpine linux
FROM node:18-alpine

# directory for the app
WORKDIR /usr/src/app


# copy package json into the container
COPY package*.json ./

# get dependencies
RUN npm install

# copy app code
COPY . .

# build the app
RUN npm run build

# expose port 3000
EXPOSE 3000

# start app
CMD ["npm", "start"]
