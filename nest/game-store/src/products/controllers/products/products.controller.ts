import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ProductsService } from '../../services/products/products.service'
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../../dtos/products.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MongoIdPipe } from '@/common/mongo-id/mongo-id.pipe'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of products' })
  getPage(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params)
  }

  @Get('filter')
  getFilter(): string {
    return `hello filter`
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.find(id)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id)
  }
}
