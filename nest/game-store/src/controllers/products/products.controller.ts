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

@Controller('products')
export class ProductsController {
  @Get()
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    return {
      message: `products ${limit} ${offset}`,
    }
  }

  @Get('filter')
  getFilter(): string {
    return `hello filter`
  }

  @Get(':id')
  get(@Param('id') id: string) {
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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateProduct) {
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
