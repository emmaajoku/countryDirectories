# CountrDirectory Service API

## Running the application
This application depends on a couple of container to run fully. The command below would build and start all dependent containers and take you into the bash temrinal of the main (`country-directory`) container:

$ ./bin/start_docker.sh

## Installation

```bash
$ yarn install
```

## Starting this application
you will need to change the server listening port of the application from anthing that 8000 is that is in use:
```
app.listen(8000, '0.0.0.0') is located in the server.ts

```
# Accessing the url
```bash
$ docker ps 
```
IMAGE                       PORT
country-directory_web_app   80/tcp, 0.0.0.0:56296->5858/tcp, 0.0.0.0:56295->8000/tcp

as you can see above the url to access the app is: `0.0.0.0:56295` but this port `56295` will change on each docker build. 
```


For local development, the database details has to be passed into the .env file.

```
DATABASE_USERNAME=
DATABASE_HOST=
DATABASE_PASSWORD=
DATABASE_NAME=
```

to turn off the automatic migration in production, you will need to change the synchronization setting to true in the ormconfig.js file.
```
"synchronize": fasle,
```
For managing your database during development use [Docker Adminer](https://beta.docs.docker.com/samples/library/adminer/). It is a web client editor that helps in managing the database. It is already part of the docker services that has been setup in the application.

### How to Use Adminer
When you run this docker command:

```
docker ps
```
* look for the adminer IP address and port.
* run the IP address in your browser to get access to the adminer dashboard.
* you will need to login to get access to the database.
* you can check for the login details in the .env file or in the docker-compose.yml file

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
```
accessing the 
```
## Technology used
[Fastify] (https://www.fastify.io/docs/)

[NestJS] (https://docs.nestjs.com/)
[TypeORM] (https://typeorm.io/#/)

## Test

### Framework Used
* [Jest] (https://jestjs.io/docs/en/getting-started)

You can run the test by using the following command:

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

```
# The swagger docs can be found 
http://0.0.0.0:****/api, Please change star with you current docker generated port number for image `country-directory_web_app` 

```
