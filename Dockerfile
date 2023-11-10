# Utilisez une image Node.js en tant qu'image de base
FROM node:14

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Exposez le port sur lequel l'application sera en écoute
EXPOSE 8080

# Commande pour exécuter l'application
CMD ["node", "app.js"]
