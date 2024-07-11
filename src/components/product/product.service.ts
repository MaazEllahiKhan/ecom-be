import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Like, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ProductDto, ProductSearchDto } from 'src/dto/product.dto';
import { PubSub } from 'graphql-subscriptions';
import { ProductSearchEntity } from 'src/entities/product_search.entity';

// const pubSub = new PubSub();

@Injectable()
export class ProductService {
  // private readonly logger = new Logger();
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductSearchEntity)
        private readonly productSearchEntity: Repository<ProductSearchEntity>,
      ) { }
    
      async getProducts(): Promise<ProductEntity[]> {
        const response = await this.productRepository.find();
        Logger.log('res', response);
        return  response;
      }

      async searchProducts(productSearch: ProductSearchDto): Promise<ProductSearchEntity[]> {
        const response = await this.productSearchEntity.find({
          where: {
            ...(productSearch.name && {categoryName: Like(`%${productSearch.name}%`)}),
            ...(productSearch.description && {itemDescription: Like(`%${productSearch.description}%`)})
          },
          skip: 0,
          take: 10,
        });
        Logger.log('ProductSearchEntity', response);
        return  response;
      }

      async addProduct(productDto:ProductDto, pubSub): Promise<ProductEntity> {
        let product = await this.productRepository.findOne({
          where:{productName: productDto.name}
        });
        if(product) {
          throw new ConflictException('Product already exists')
        }
        product = this.productRepository.create({productName: productDto.name});
        const res = await this.productRepository.save(product);
        console.log('res', res);
        pubSub.publish('productAdded', { productAdded: res });
        return  res;
      }
}
