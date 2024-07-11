import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { AdminUserEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( @InjectRepository(AdminUserEntity)
  private readonly adminRepository: Repository<AdminUserEntity>,
  private readonly authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      // creating and getting context
      const ctx = GqlExecutionContext.create(context)
      let req = ctx.getContext().req
      console.log('req', req.headers)
      if (req.headers.authorization) {
        let decodedToken = ''
        try {
          decodedToken = await this.authService.validateJwtToken(
            req.headers.authorization,
          );
          console.log('decodedToken', decodedToken)
        } catch (error) {
          console.log('error', error)
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              error: 'authorization token is incorrect!',
            },
            HttpStatus.UNAUTHORIZED,
          )
        }

        if (decodedToken) {
          const email = decodedToken['email']
          const adminUser = await this.adminRepository.findOne({
            where: {
              email: email,
            },
          })
            console.log('Request via admin user: ', adminUser.email)
            req.user = adminUser
            new ExecutionContextHost([req])
            return true
          // }
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'authorization token not provided!',
          },
          HttpStatus.UNAUTHORIZED
        )
      }
    } catch (error) {
      console.log('error', error)
      throw new HttpException(
        {
          status: error.response.status,
          error: error.response.error,
        },
        error.status,
      )
    }
  }
}
