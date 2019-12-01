# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY node_modules/ .
COPY package.json .next ./
EXPOSE 3000
CMD ["/app/node_modules/.bin/next", "start"]
