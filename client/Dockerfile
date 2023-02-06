FROM node:19.4.0-alpine
COPY dist/blog/ dist/blog
RUN apk --no-cache add curl
CMD ["node", "dist/blog/server/main.js"]
