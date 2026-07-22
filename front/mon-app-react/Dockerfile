FROM node:20-alpine3.20

RUN apk add --no-cache su-exec

WORKDIR /app

COPY package*.json ./

ENV CYPRESS_INSTALL_BINARY=0

RUN --mount=type=cache,target=/root/.npm \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-timeout 600000 && \
    npm install

COPY . .

RUN chown -R node:node /app

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:5173', r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]