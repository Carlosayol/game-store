import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CreateProduct } from '@/types/products'
import { ProductsService } from '@/services/products/products.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    console.log(limit)
    console.log(offset)
    return this.productsService.findAll()
  }

  @Get('filter')
  getFilter(): string {
    return `hello filter`
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.productsService.find(id)
  }

  @Post()
  create(@Body() payload: CreateProduct) {
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateProduct) {
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id)
  }
}
