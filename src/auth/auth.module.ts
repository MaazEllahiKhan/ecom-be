import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'src/components/admin/admin.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminModule } from 'src/components/admin/admin.module';
import { AdminUserEntity } from 'src/entities/admin.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy'
@Module({
  imports: [
    forwardRef(() => AdminModule),
    // TypeOrmModule.forFeature([AdminUserEntity]),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
