# Use uma imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta em que o backend vai rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
