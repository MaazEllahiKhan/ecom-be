import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/components/admin/admin.service';
import * as bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {

    constructor(
        // @Inject(forwardRef(() => AdminService))
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) { }

    async validateAdminUser(email: string, pass: string): Promise<any> {
        const user = await this.adminService.findOne(email)
        if (user) {
            
            const isPasswordMatched: boolean = bcrypt.compareSync(pass, user.password)
            if (isPasswordMatched) {
                const { password, ...result } = user
                return user
            } else {
                throw new GraphQLError( 'Incorrect Password',
                   {
                    extensions: {
                        code: HttpStatus.FORBIDDEN
                    }
                   }
                )
            }
        } else {
            throw new GraphQLError('User does not exist',
                {
                 extensions: {
                     code: HttpStatus.FORBIDDEN
                 }
                }
             )
        }
    }

    async adminLogin(auth: any) {
        const user: any = await this.validateAdminUser(auth.email, auth.password)
        console.log('user', user, process.env.JWT_SECRET_KEY)
        const { access_token } = await this.generateJwtToken(user)
        console.log('access_token', access_token);
        return {
            admin: user,
            access_token,
        }
    }

    async forgotPasswordGenerateToken(auth: any) {
        const payload = { email: auth.email, sub: auth.key }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async validateJwtToken(token: any) {
        return await this.jwtService.verifyAsync(token)
    }

    async generateJwtToken(user) {
        const payload = { email: user.email, sub: user.userId }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
