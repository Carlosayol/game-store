import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/products/dtos/categories.dto'
import { CategoriesService } from '@/products/services/categories/categories.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  getPage() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.categoryService.find(id)
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id)
  }
}
