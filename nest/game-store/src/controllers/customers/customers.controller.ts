import { CreateCustomer } from '@/types/customers'
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

@Controller('customers')
export class CustomersController {
  @Get()
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `customers ${limit} ${offset}`
  }

  @Get(':id')
  get(@Param('id') id: string): string {
    return `customer ${id}`
  }

  @Post()
  create(@Body() payload: CreateCustomer) {
    return {
      body: payload,
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateCustomer) {
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
