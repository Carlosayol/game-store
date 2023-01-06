import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string
}
