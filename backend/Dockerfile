FROM node:16

# WORKDIR /app

# COPY package.json ./

# COPY package-lock.json ./

# RUN npm install

# COPY ./ ./

# EXPOSE 4000

# CMD ["npm", "run", "start"]

COPY . .

RUN npm install

EXPOSE 4000

ENTRYPOINT [ "npm", "run", "prod" ]