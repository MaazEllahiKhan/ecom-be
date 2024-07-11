import { Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class OrderResolver {
    constructor(private readonly OrderService: OrderService) {}

    @Query('getOrderItems')
    async getOrderItems() {
      try {
        return await this.OrderService.getOrderItems()
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.EXPECTATION_FAILED,
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
        )
      }
    }
}
