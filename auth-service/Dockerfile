FROM node:latest

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm i

COPY . .

CMD [ "pnpm", "run", "dev" ]

EXPOSE 3000
