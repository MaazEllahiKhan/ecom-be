import { Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Resolver()
export class OrderResolver {
    constructor(private readonly OrderService: OrderService) {}

    @Query('getOrderItems')
    async getOrderItems() {
      try {
        return await this.OrderService.getOrderItems()
      } catch (error) {
        throw new GraphQLError(error.message,
          {
            extensions: {
              code:  HttpStatus.EXPECTATION_FAILED
            }
          }
        )
      }
    }
}
