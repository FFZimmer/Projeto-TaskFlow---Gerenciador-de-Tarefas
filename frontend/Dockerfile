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

# Compile o frontend
RUN npm run build

# Exponha a porta em que o frontend vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
