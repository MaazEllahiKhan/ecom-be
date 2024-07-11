import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductDto, ProductSearchDto } from 'src/dto/product.dto';
import { PubSub } from 'graphql-subscriptions';
import { ProductEntity } from 'src/entities/product.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const pubSub = new PubSub();

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard)
    // @UseGuards(JwtAuthGuard)
    @Query('getProducts')
    async getProducts() {
      try {
        return await this.productService.getProducts()
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

    @Query('searchProducts')
    async searchProducts(@Args() productSearch: ProductSearchDto) {
      try {
        return await this.productService.searchProducts(productSearch)
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
    
    @Mutation('addProduct')
    async addProduct(@Args() args:ProductDto) {
      try {
        return await this.productService.addProduct(args,pubSub)
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

    @Subscription((returns) => ProductEntity)
    productAdded() {
      return pubSub.asyncIterator('productAdded');
    }
  
}
