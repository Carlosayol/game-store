import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { OrdersService } from '../../services/orders/orders.service'
import { AddProductsToOrderDto, CreateOrderDto, UpdateOrderDto } from '../../dtos/orders.dto'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.ordersService.find(id)
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload)
  }

  @Put(':id/products')
  updateProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.ordersService.addProducts(id, payload.productsIds)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id)
  }

  @Delete(':id/products/:productId')
  removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.ordersService.removeProduct(id, productId)
  }
}
