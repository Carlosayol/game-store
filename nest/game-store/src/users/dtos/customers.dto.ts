import { PartialType } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string

  @IsArray()
  @IsNotEmpty()
  readonly preferences: any
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string
}
