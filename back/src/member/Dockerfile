FROM node:20-alpine

WORKDIR /app

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install

COPY src/shared app/src/shared

COPY src/member app/src/member

RUN npm run build

RUN rm -rf app
RUN rm -rf node_modules
RUN npm install --only=production
RUN rm tsconfig.json

CMD ["node", "dist/member/index.js"]

EXPOSE 4000