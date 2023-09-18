# Online Cafe Frontend

This is the frontend application of the Cafe store app. I have add few steps to compile and run the application locally and using Docker.

## Technologies

- React JS
- Redux/ Redux Saga
- TypeScript
- Material UI
- Aggrid Table

### Before start, please check the Node and NPM versions. I have added my versions below

- Node JS - 18.13.0
- NPM - 8.19.3

### Run the application locally

1. Clone the GitHub repository to your computer using [this](https://github.com/rusiruavb/cafe-fronend.git) link
2. Once cloned, run the following command to install the dependencies

```
npm install
```

3. After all the dependencies are installed, run the following command to start the application

```
npm run start
```

4. Finally, the application will run on port 3000. Access the application via [this](http://localhost:3000) link

### Run the application using Docker

1. Make sure Docker is installed to your computer
2. Clone the GitHub repository to your computer using [this](https://github.com/rusiruavb/cafe-fronend.git) link
3. Run the following command to build the Docker image

```
docker build -t cafe-frontend-app:v1.0.0 .
```

4. Once the Docker image is built, run the following command to start the aplication via Docker container

```
docker run --name cafe-fronend -p 3000:3000 cafe-frontend-app
```

5. Finally, the application will run on port 3000. Access the application via [this](http://localhost:3000) link
