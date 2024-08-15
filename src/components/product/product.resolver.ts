import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { HttpStatus, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductDto, ProductSearchDto } from 'src/dto/product.dto';
import { PubSub } from 'graphql-subscriptions';
import { ProductEntity } from 'src/entities/product.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GraphQLError } from 'graphql';
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { error } from 'console';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../common/redis-micro/pubsub.module';



// @UseInterceptors(CacheInterceptor)
@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService,
    @Inject('REDIS_SERVICE') private client: ClientProxy,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,

  ) { }

  @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  @Query('getProducts')
  async getProducts() {
    try {
      let products = await firstValueFrom(this.client.send({ cmd: 'get_product_list' }, { key: 'get-product-list' })).catch(error => console.log('err', error));
      // this.client.send({ cmd: 'get_product_list' }, { key: 'get-product-list' }).pipe(
      //   map((res) => {
      //     console.log('res', res);
      //     return res.productsRes;
      //   })
      // ).subscribe(data => console.log('data', data));

      console.log('products', products);

      if (products) return products;
      products = await this.productService.getProducts();
      const emitRes = this.client.emit('set_product_list', products);
      console.log('emitRes', emitRes);
      return products;
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

  @Query('searchProducts')
  async searchProducts(@Args() productSearch: ProductSearchDto) {
    try {
      return await this.productService.searchProducts(productSearch)
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

  @Mutation('addProduct')
  async addProduct(@Args() args: ProductDto) {
    try {
      return await this.productService.addProduct(args, this.pubSub)
    } catch (error) {
      throw new GraphQLError(error.message,
        {
          extensions: {
            code: HttpStatus.EXPECTATION_FAILED
          }
        }
      )
      // throw new HttpException(
      //   {
      //     status: HttpStatus.EXPECTATION_FAILED,
      //     error: error.message,
      //   },
      //   HttpStatus.FORBIDDEN,
      // )
    }
  }

  @Subscription((returns) => ProductEntity, {
    filter: (payload, variables, userContext) => {
      console.log('payload, variables', payload, variables, userContext)
      return true;
    }
  })
  productAdded() {
    return this.pubSub.asyncIterator('productAdded');
  }

}
