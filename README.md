# REST API Node Example

Example API built with Node Express, populates an in-memory MongoDB instance with seed data.


## Features

- **Web API**: [Express](https://expressjs.com/) web framework
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Sanitizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Code coverage**: using [coveralls](https://coveralls.io)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)


## Getting Started

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
```

Start dev via:

```bash
npm run dev
```

Connect to the Swagger UI API documentation:

http://localhost:3000/v1/docs/

