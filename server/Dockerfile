FROM node:16
LABEL version="1.0"
LABEL description="Tanker"

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5001


CMD ["npm", "run", "start"]
