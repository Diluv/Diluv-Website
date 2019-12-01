FROM mhart/alpine-node:10
WORKDIR /app
COPY node_modules/ ./
COPY package.json .next ./
EXPOSE 3000
CMD ["yarn", "start"]
