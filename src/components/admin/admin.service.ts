import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/dto/admin.dto';
import { AdminUserEntity } from 'src/entities/admin.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql';

@Injectable()
export class AdminService {
  private adminRepository;

  SALT = 10
  constructor(private dataSource: DataSource) {
    this.adminRepository = this.dataSource.getRepository(AdminUserEntity);
  }

  async createUser(admin: SignupDto) {
    try {
      let userObj: AdminUserEntity = await this.adminRepository.findOne({
        where: {
          email: admin.email,
        },
      })
      if (userObj) {
        throw new ConflictException(`Admin already exist`)
      }

      userObj = new AdminUserEntity()
      userObj.email = admin.email
      userObj.password = await bcrypt.hash(admin.password, this.SALT)
      userObj.first_name = admin.first_name
      userObj.last_name = admin.last_name
      userObj.status = ''
      userObj.twoFA_Key = ''
      userObj = await this.adminRepository.save(userObj)
      console.log('userObj', userObj)
      return userObj
    } catch (error) {
      console.log('error', error)
      throw new GraphQLError(error.message,
        {
          extensions: {
            code: error.status
          }
        }
      )
    }
  }

  async findOne(email: string): Promise<AdminUserEntity | undefined> {
    return await this.adminRepository.findOne({
      where: {
        email: email,
      },
    })
  }

}
