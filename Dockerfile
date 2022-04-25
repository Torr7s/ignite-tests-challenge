FROM node:latest 

WORKDIR /usr/app

COPY package.json ./
COPY .env ./

RUN yarn

COPY . .

EXPOSE 3030

CMD ["yarn", "dev"]