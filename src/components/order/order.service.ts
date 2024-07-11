import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/entities/order_Item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
      ) { }
    
      async getOrderItems(): Promise<OrderItemEntity[]> {
         const res = await this.orderItemRepository.find({
            relations: {
                orderId: true,
                productId: true
            },
            skip: 0,
            take: 3
        });
        console.log('res', res);
        return res;
      }
}
