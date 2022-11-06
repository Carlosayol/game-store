import { CreateUser } from '@/types/users'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get()
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `users ${limit} ${offset}`
  }

  @Get(':id')
  getProduct(@Param('id') id: string): string {
    return `user ${id}`
  }

  @Post()
  create(@Body() payload: CreateUser) {
    return {
      body: payload,
    }
  }
}
