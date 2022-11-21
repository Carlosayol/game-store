import { PartialType } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string
}
