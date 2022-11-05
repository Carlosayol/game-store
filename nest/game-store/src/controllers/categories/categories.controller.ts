import { Controller, Get, Param } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `category ${id} and product ${productId}`
  }
}
