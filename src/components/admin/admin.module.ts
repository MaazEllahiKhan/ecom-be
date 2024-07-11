import { Module, forwardRef } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/entities/admin.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([AdminUserEntity]),
    forwardRef(() => AuthModule)
],
  providers: [AdminResolver, AdminService],
  exports: [AdminService]
})
export class AdminModule {}
