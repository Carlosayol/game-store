import { CreateCustomer } from '@/types/customers'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

@Controller('customers')
export class CustomersController {
  @Get('customers')
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `customers ${limit} ${offset}`
  }

  @Get('customers/:id')
  getProduct(@Param('id') id: string): string {
    return `customer ${id}`
  }

  @Post()
  create(@Body() payload: CreateCustomer) {
    return {
      body: payload,
    }
  }
}
