import { Controller, Get, Param, Query } from '@nestjs/common'

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
}
