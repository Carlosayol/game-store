import { CreateCategory } from '@/types/categories'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  get(@Param('id') id: string, @Param('productId') productId: string): string {
    return `category ${id} and product ${productId}`
  }

  @Post()
  create(@Body() payload: CreateCategory) {
    return {
      body: payload,
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateCategory) {
    return {
      id,
      payload,
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      id,
    }
  }
}
