import { CreateUser } from '@/types/users'
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

@Controller('users')
export class UsersController {
  @Get()
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `users ${limit} ${offset}`
  }

  @Get(':id')
  get(@Param('id') id: string): string {
    return `user ${id}`
  }

  @Post()
  create(@Body() payload: CreateUser) {
    return {
      body: payload,
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateUser) {
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
