import { CreateOrder } from '@/types/orders'
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

@Controller('orders')
export class OrdersController {
  @Get()
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `orders ${limit} ${offset}`
  }

  @Get(':id')
  get(@Param('id') id: string): string {
    return `order ${id}`
  }

  @Post()
  create(@Body() payload: CreateOrder) {
    return {
      body: payload,
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateOrder) {
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
