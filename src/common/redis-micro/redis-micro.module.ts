import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'REDIS_SERVICE',
				transport: Transport.REDIS,
				options: {
					port: 10001, // Default port
					host: 'localhost',
				}
			}
		]),
	],
	providers: [
		{
			provide: 'REDIS_SERVICE',
			useFactory: () => {
				return ClientProxyFactory.create({
					transport: Transport.REDIS,
					options: {
						host: 'localhost',
						port: 10001,
					}
				});
			},
		},
	],
	exports: ['REDIS_SERVICE']
})
export class RedisMicroModule {
}
