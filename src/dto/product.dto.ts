import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AddProductInput } from "src/graphql";


export class ProductDto extends AddProductInput {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class ProductSearchDto {
    @IsString()
    @IsOptional()
    name: string
  
    @IsString()
    @IsOptional()
    description: string
  }