## Description
Arquitetura de microservice para gestão de partidas e ranking de jogadores de tênis;

## Stack
- Nestjs microservices https://docs.nestjs.com/microservices/basics
- Broker rabbitmq https://www.rabbitmq.com/
- Database MongoDB


## Microservices
- api-gateway (recebe as requisições e encaminha para o broker)
- micro-admin-backend (recebe requisições de administradores)
- micro-desafios (recebe requisições relacionadas a desafios)
- micro-rankings (recebe requisições relacionadas ao ranking)
- micro-notificacoes (responsável por realizar notificações)

### api-gateway
- Gateway Routing
- Requests aggregation
- Authentication
- Response Caching
- Rate limiting and throttling

### micro-admin-backend

### micro-desafios

### micro-rankings

### micro-notificacoes