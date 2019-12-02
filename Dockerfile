FROM mhart/alpine-node:10
WORKDIR /app
COPY node_modules/ ./node_modules/
COPY .next/ ./.next/
COPY package.json ./package.json
EXPOSE 3000
CMD ["yarn", "start"]
