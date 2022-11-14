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
import { ProductsService } from '@/products/services/products/products.service'
import { ParseIntPipe } from '@/common/parse-int/parse-int.pipe'
import {
  CreateProductDto,
  UpdateProductDto,
} from '@/products/dtos/products.dtos'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getPage(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
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
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id)
  }
}
