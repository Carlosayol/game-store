import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@/users/dtos/customers.dtos'
import { CustomersService } from '@/users/services/customers/customers.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  getPage() {
    return this.customerService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.customerService.find(id)
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(id)
  }
}
