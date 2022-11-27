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
import { ProductsService } from '../../services/products/products.service'
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto'
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of products' })
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
