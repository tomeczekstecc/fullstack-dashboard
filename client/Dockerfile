FROM node:16 as builder

LABEL version="1.0"
LABEL description="Tanker"

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build
#
#CMD ["npm", "run", "dev"]



FROM nginx:1.23-alpine
EXPOSE 3002
COPY ./nginx/default-prod.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build /usr/share/nginx/html
