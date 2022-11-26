FROM node:16

# WORKDIR /app

# COPY package.json ./

# COPY package-lock.json ./

# RUN npm install --force

# COPY ./ ./

# EXPOSE 3000

# CMD ["npm", "run", "start"]

COPY . .

RUN npm install --force

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "build" ]