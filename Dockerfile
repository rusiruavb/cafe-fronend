FROM node:14.18-alpine AS BUILD_IMAGE 
RUN apk add --no-cache nodejs npm
WORKDIR /cafe-frontend
COPY ["package-lock.json", "package.json", "./"]
RUN npm install --check-files --non-interactive --ignore-optional --frozen-lockfile
COPY . .
RUN npm run build 

FROM node:14.18-alpine
WORKDIR /app
COPY --from=BUILD_IMAGE /cafe-frontend /app/
EXPOSE 3000
ENTRYPOINT [ "npm" ] 
CMD [ "start" ]