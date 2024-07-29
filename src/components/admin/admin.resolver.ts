import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, SignupDto } from 'src/dto/admin.dto';
import { HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { AdminLoginOutput, AdminSignUpOutput } from 'src/graphql';
import { GraphQLError } from 'graphql';

@Resolver()
export class AdminResolver {
    constructor(
        private readonly adminService: AdminService,
        // @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
      ) {}
    

      @Mutation('adminSignUp')
      async AdminSignUp(@Args() args: SignupDto): Promise<AdminSignUpOutput> {
        // try {
        console.log('args.token, process.env.TOKEN', args.token, process.env.ADMIN_SIGNUP_TOKEN)
        if (args.token != process.env.ADMIN_SIGNUP_TOKEN) {
          throw new GraphQLError('Authorization Token not correct!',
            {
              extensions: {
                code: HttpStatus.UNAUTHORIZED
              }
            }
          )
        }
        await this.adminService.createUser(args)
        const response: AdminSignUpOutput = {
          email: args.email,
        }
        return response
      }
    
      @Query('adminLogin')
      async adminLogin(@Args() args: LoginDto): Promise<AdminLoginOutput> {
        console.log('args', args)
        const obj = await this.authService.adminLogin(args)
        // let is2faEnabled: boolean
        // if (obj.admin.is2faEnabled) {
        //   is2faEnabled = true
        // } else {
        //   is2faEnabled = false
        // }
        console.log('obj', obj)
        const returnOutput: AdminLoginOutput = {
          access_token: obj.access_token,
        //   is2faEnabled,
        }
        return returnOutput
      }
    
}
