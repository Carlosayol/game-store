import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateProduct } from '@/types/products'

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return {
      message: `products ${limit} ${offset}`,
    }
  }

  @Get('filter')
  getProductFilter(): string {
    return `hello filter`
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return {
      message: `product ${id}`,
    }
  }

  @Post()
  create(@Body() payload: CreateProduct) {
    return {
      body: payload,
    }
  }
}
