FROM mhart/alpine-node:10
WORKDIR /app
COPY node_modules/ ./node_modules/
COPY public ./public
COPY .next/ ./.next/
COPY next.config.js ./next.config.js
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
