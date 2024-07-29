import {
    IsEmail,
    Length,
    IsString,
    Matches,
    IsNotEmpty,
    IsOptional,
    IsBase32,
    IsBoolean,
  } from 'class-validator'
  import {
    AdminLoginInput,
    AdminSignUpInput,
    AdminUpdatePasswordInput,
    AdminChangePasswordInput,
  } from './../graphql'
  
  export class SignupDto extends AdminSignUpInput {
    @IsString()
    first_name: string
  
    @IsString()
    last_name: string
  
    @IsString()
    token: string
  
    @IsEmail()
    email: string
  
    @IsNotEmpty()
    @IsString()
    password: string
  }
  
  export class LoginDto extends AdminLoginInput {
    @IsNotEmpty()
    @IsEmail()
    email: string
  
    @IsNotEmpty()
    @IsString()
    password: string
  }
  
  export class AdminUpdatePasswordDto extends AdminUpdatePasswordInput {
    @IsNotEmpty()
    @IsString()
    password: string
  }
  
  export class AdminChangePasswordDto extends AdminChangePasswordInput {
    @IsNotEmpty()
    @IsString()
    oldPassword: string
  
    @IsNotEmpty()
    @IsString()
    newPassword: string
  }
  
  export class Verify2FADto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string
  }
  
  export class EnableDisable2faDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string
  
    @IsNotEmpty()
    @IsBoolean()
    isEnabled: boolean
  }
  