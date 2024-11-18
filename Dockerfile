FROM node:18 as base

FROM base as build

COPY ./app /remix/app
COPY ./package.json /remix/package.json
COPY ./package-lock.json /remix/package-lock.json
COPY ./postcss.config.js /remix/postcss.config.js
COPY ./tailwind.config.ts /remix/tailwind.config.ts
COPY ./tsconfig.json /remix/tsconfig.json
COPY ./vite.config.ts /remix/vite.config.ts

WORKDIR /remix

RUN npm ci && npm run build

FROM base as app

COPY --from=build /remix/build /app/build
COPY --from=build /remix/node_modules /app/node_modules
COPY --from=build /remix/package.json /app/package.json
COPY ./public /app/public
COPY ./.env /app/.env

WORKDIR /app

CMD [ "npm", "start" ]