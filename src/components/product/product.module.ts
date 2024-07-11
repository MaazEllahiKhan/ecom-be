import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductSearchEntity } from 'src/entities/product_search.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdminUserEntity } from 'src/entities/admin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity, ProductSearchEntity, AdminUserEntity]),
        forwardRef(() => AuthModule),
    ],
    controllers: [],
    providers: [ProductResolver, ProductService],
    exports: [ProductService]
})
export class ProductModule {}
