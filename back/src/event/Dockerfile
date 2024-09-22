FROM node:20-alpine

WORKDIR /app

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install

COPY src/shared app/src/shared

COPY src/event app/src/event

RUN npm run build

CMD ["node", "dist/event/index.js"]

EXPOSE 3000