FROM node:lts-alpine
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . .
ENV NODE_ENV production
ENV DATABASE_HOST localhost
ENV DATABASE_NAME boilerplate
ENV DATABASE_PASSWORD boilerplate
ENV DATABASE_USER boilerplate
RUN npm run dockerbuild
EXPOSE 5004
CMD ["npm", "start"]
