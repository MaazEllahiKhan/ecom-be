import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';
import { ProductSubscriber } from './entities/event_subscribers/product.subscriber';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './components/admin/admin.module';
import { NotificationModule } from './components/notification/notification.module';
import { PubsubModule } from './common/redis-micro/pubsub.module';
import { RedisMicroModule } from './common/redis-micro/redis-micro.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/src/entities/**/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      subscribers: [ProductSubscriber]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true
      },
      playground: true,
    }),
    RedisMicroModule,
    PubsubModule,
    ProductModule,
    OrderModule,
    AuthModule,
    AdminModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
