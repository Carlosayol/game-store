import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get('users')
  getProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `users ${limit} ${offset}`
  }

  @Get('users/:id')
  getProduct(@Param('id') id: string): string {
    return `user ${id}`
  }
}
