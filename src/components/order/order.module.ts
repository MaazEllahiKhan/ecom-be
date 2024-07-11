import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order_Item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity])
],
controllers: [],
  providers: [OrderResolver, OrderService],
  exports: [OrderService]
})

export class OrderModule {}
