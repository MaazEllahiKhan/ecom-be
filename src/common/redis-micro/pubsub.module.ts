import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';
const options = {
    host: 'localhost',
    port: 10001,
};
@Global()
@Module({
    providers: [
        {
            provide: PUB_SUB,
            useFactory: () => {
                return new RedisPubSub({
                    publisher: new Redis(options),
                    subscriber: new Redis(options)
                })
            },
        },
    ],
    exports: [PUB_SUB]
})
export class PubsubModule {
}
