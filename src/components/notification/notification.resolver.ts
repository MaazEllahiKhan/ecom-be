import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../common/redis-micro/pubsub.module';
import { HttpStatus, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GraphQLError } from 'graphql';
import { asyncScheduler, firstValueFrom, map, observeOn, pipe } from 'rxjs';
import { RedisEventOutput } from 'src/graphql';

@Resolver()
export class NotificationResolver {
  constructor(
    @Inject('REDIS_SERVICE') private client: ClientProxy,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,

  ) { }

  @Query('getSingleNotification')
  async getSingleNotification() {
    try {
      let res = await firstValueFrom(this.client.send({ cmd: 'message' }, { key: 'message' })).catch(error => console.log('err', error));

      // this.client.send({ cmd: 'messages' }, { key: 'messages' }).pipe((res) => { console.log('res', res); return res })
      // this.client.send({ cmd: 'test-pattern' }, { key: 'test-pattern' }).subscribe(value => {
      //   console.log(`Received value: ${value}`);
      // });
      // console.log('res', res);
      // this.pubSub.publish('redisEvents', { redisEvents: { hello: 'asd', date: res.date } });
      return 'res';
      // return await this.productService.searchProducts(productSearch)
    } catch (error) {
      throw new GraphQLError(error.message,
        {
          extensions: {
            code: HttpStatus.EXPECTATION_FAILED
          }
        }
      )
    }
  }

  @Query('getConsumeNotifications')
  async getConsumeNotifications(
    @Args('group', { defaultValue: '' }) group: string,
    @Args('consumer', { defaultValue: '' }) consumer: string,
    @Args('count', { nullable: true }) count?: number) {
    try {
      console.log('group, consumer, count', group, consumer, count)
      // let res = await firstValueFrom(this.client.send({ cmd: 'message' }, { key: 'message' })).catch(error => console.log('err', error));
      this.client.send({ cmd: 'consume' }, { group, consumer, count }).subscribe((res) => { console.log('res', res) })
      // console.log('res', res);
      // this.pubSub.publish('redisEvents', { redisEvents: { hello: 'asd', date: res.date } });
      return 'res';
      // return await this.productService.searchProducts(productSearch)
    } catch (error) {
      throw new GraphQLError(error.message,
        {
          extensions: {
            code: HttpStatus.EXPECTATION_FAILED
          }
        }
      )
    }
  }


  @Subscription((returns) => RedisEventOutput)
  redisEvents() {
    return this.pubSub.asyncIterator('redisEvents');
  }
}
