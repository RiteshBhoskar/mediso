FROM node:22-alpine

WORKDIR wss-server

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "docker:dev"]
