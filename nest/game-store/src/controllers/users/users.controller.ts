import { CreateUserDto, UpdateUserDto } from '@/dtos/users.dtos'
import { UsersService } from '@/services/users/users.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getPage() {
    return this.userService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.find(id)
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
