import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @UseGuards(ApiKeyGuard)
  @Get('new')
  newEndpoint(): string {
    return 'This is new'
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks()
  }
}
