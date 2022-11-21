import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator'

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string
}
