import { ClientsModule, Transport } from '@nestjs/microservices';
// BASE_MICROSERVICE
export const BaseMicroserviceModule = ClientsModule.register([
  {
    name: 'BASE_MICROSERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8071,
    },
  },
]);
