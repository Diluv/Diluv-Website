FROM mhart/alpine-node:10
WORKDIR /app
COPY node_modules/ ./node_modules/
COPY .next/ ./.next/
COPY next.config.js ./next.config.js
COPY public ./public
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
