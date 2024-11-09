FROM node:20-alpine

WORKDIR /app

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install

COPY src/shared app/src/shared

COPY src/event app/src/event

RUN npm run build

RUN rm -rf app
RUN rm -rf node_modules
RUN npm install --only=production
RUN rm tsconfig.json

CMD ["node", "dist/event/index.js"]

EXPOSE 3000