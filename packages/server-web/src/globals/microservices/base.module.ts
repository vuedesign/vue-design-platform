import { ClientsModule, Transport } from '@nestjs/microservices';

// BASE_MICROSERVICE

// export const BaseMicroserviceModule = ClientsModule.registerAsync({
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     name: 'BASE_MICROSERVICE',
//     transport: Transport.TCP,
//     options: {
//       host: '127.0.0.1',
//       port: 8071,
//     },
//     // timeout: configService.get('HTTP_TIMEOUT'),
//     // maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
//   }),
//   inject: [ConfigService],
//   // name: 'BASE_MICROSERVICE',
//   // transport: Transport.TCP,
//   // options: {
//   //   host: '127.0.0.1',
//   //   port: 8071,
//   // },
// });

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
