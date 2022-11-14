import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string
}
