import { CreateOrder } from '@/types/orders'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

@Controller('orders')
export class OrdersController {
  @Get('orders')
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `orders ${limit} ${offset}`
  }

  @Get('orders/:id')
  getProduct(@Param('id') id: string): string {
    return `order ${id}`
  }

  @Post()
  create(@Body() payload: CreateOrder) {
    return {
      body: payload,
    }
  }
}
