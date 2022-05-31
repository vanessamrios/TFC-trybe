FROM node:16-alpine
WORKDIR /app
COPY . . 
# copia udo que está no diretório do dockerfile para o diretório /app do container.
RUN npm install && npm run build

CMD ["npm", "start"]
