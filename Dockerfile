FROM node:22-alpine

WORKDIR /mediso

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev:docker"]