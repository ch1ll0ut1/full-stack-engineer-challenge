# todo
- move routes into sub directory with public/private names

# Getting Started
- Create .env
```
cp .example.env .env
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run the project directly in TS
```
npm run watch-server
```

- Build and run the project in JS
```
npm run build
npm run start
```

- Run integration or load tests
```
npm run test:integration
npm run test:load
```

## Docker (optional)
A docker-compose file has been added to the project with a postgreSQL (already setting user, pass and dbname as the ORM config is expecting) and an ADMINER image (easy web db client).

It is as easy as go to the project folder and execute the command 'docker-compose up' once you have Docker installed, and both the postgreSQL server and the Adminer client will be running in ports 5432 and 8080 respectively with all the config you need to start playing around. 

If you use Docker natively, the host for the server which you will need to include in the ORM configuration file will be localhost, but if you were to run Docker in older Windows versions, you will be using Boot2Docker and probably your virtual machine will use your ip 192.168.99.100 as network adapter. This mean your database host will be the aforementioned ip and in case you want to access the web db client you will also need to go to http://19.168.99.100/8080


# Notes - things not done but should be
- fix all npm security issues
- update/upgrade all packages
- convert tslint to eslint
- use npm workspace for shared dependencies
- config variables should have better camelCase naming
- make router path defnition generic for crud operations
- use absolute paths (requires build modification to transform paths and config in tsconfig for base path)
- seperate db and webserver init into seperate files and have a startup script just calling a array of setup scripts (like db and api)
- figure out how to read ormconfig of typeorm from .env
- choice of database: I didnt use postgresql much (so the implementation for that might not be perfect). For the given requirement it seemed to be the right db (without much other requirements). I normaly used mysql, or in case of nested json i would use mongodb or for timeseries something like influxdb (which might be the one that should be used here if the data volume is big). 

# Structure

## Controllers

Handle api request / response, uses Services to execute business logic

## Models

Define db schema, object type and validation requirements

## Services

Contain all business logic and seperate data access from request/response handling

## API Docs

Run the project and then open http://localhost:3000/swagger-html

## Database - ORM
This API is prepared to work with an SQL database, using [TypeORM](https://github.com/typeorm/typeorm). In this case we are using postgreSQL, and that is why in the package.json 'pg' has been included. If you where to use a different SQL database remember to install the correspondent driver.

The ORM configuration and connection to the database can be specified in the file 'ormconfig.json'. Here is directly in the connection to the database in 'server.ts' file because a environment variable containing databaseUrl is being used to set the connection data. This is prepared for Heroku, which provides a postgres-string-connection as env variable. In local is being mocked with the docker local postgres as can be seen in ".example.env"

It is importante to notice that, when serving the project directly with *.ts files using ts-node,the configuration for the ORM should specify the *.ts files path, but once the project is built (transpiled) and run as plain js, it will be needed to change it accordingly to find the built js files:

```
"entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ]
```

**NOTE: this is now automatically handled by the NODE_ENV variable too. 

Notice that if NODE_ENV is set to development, the ORM config won't be using SSL to connect to the DB. Otherwise it will.

```
createConnection({
    ...
    extra: {
        ssl: config.DbSslConn, // if not development, will use SSL
    }
 })
```

## Entities validation
This project uses the library class-validator, a decorator-based entity validation, which is used directly in the entities files as follows:
```
export class User {
    @Length(10, 100) // length of string email must be between 10 and 100 characters
    @IsEmail() // the string must comply with an standard email format
    @IsNotEmpty() // the string can't be empty
    email: string;
}
```
Once the decorators have been set in the entity, you can validate from anywhere as follows:
```
const user = new User();
user.email = "avileslopez.javier@gmail"; // should not pass, needs the ending .com to be a valid email

validate(user).then(errors => { // errors is an array of validation errors
    if (errors.length > 0) {
        console.log("validation failed. errors: ", errors); // code will get here, printing an "IsEmail" error
    } else {
        console.log("validation succeed");
    }
});
```

For further documentation regarding validations see [class-validator docs](https://github.com/typestack/class-validator).


## Integrations and load tests
Integrations tests are a Postman collection with assertions, which gets executed using Newman from the CI (Github Actions). It can be found at `/integrationtests/node-koa-typescript.postman_collection.json`; it can be opened in Postman and get modified very easily.

Load tests are a locust file with assertions, which gets executed from the CI (Github Actions). It can be found at `/loadtests/locustfile.py`; It is written in python and can be executed locally against any host once python and locust are installed on your dev machine.

**NOTE: at the end of load tests, an endpoint to remove all created test users is called.

## Logging
Winston is designed to be a simple and universal logging library with support for multiple transports.

A "logger" middleware passing a winstonInstance has been created. Current configuration of the logger can be found in the file "logging.ts". It will log 'error' level to an error.log file and 'debug' or 'info' level (depending on NODE_ENV environment variable, debug if == development) to the console.

```
// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));
```


