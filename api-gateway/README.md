# api-gateway
## Responsibilities
- Gateway Routing
- Requests aggregation
- Authentication
- Response Caching
- Rate limiting and throttling

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker
```
docker run --detach --restart always --hostname rabbitmq1 --volume $PWD/storage/rabbitmq3:/var/lib/rabbitmq --name multimarket-rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```