import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsHash, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string

  @IsHash('sha256')
  @IsNotEmpty()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
