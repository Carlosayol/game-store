import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto'
import { CustomersService } from '../../services/customers/customers.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Customers')
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
