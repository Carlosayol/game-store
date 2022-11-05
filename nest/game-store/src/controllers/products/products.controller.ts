import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('products')
export class ProductsController {
  @Get('products')
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `products ${limit} ${offset}`
  }

  @Get('products/filter')
  getProductFilter(): string {
    return `hello filter`
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string): string {
    return `product ${id}`
  }
}
