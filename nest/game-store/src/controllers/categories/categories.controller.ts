import { CreateCategory } from '@/types/categories'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `category ${id} and product ${productId}`
  }

  @Post()
  create(@Body() payload: CreateCategory) {
    return {
      body: payload,
    }
  }
}
