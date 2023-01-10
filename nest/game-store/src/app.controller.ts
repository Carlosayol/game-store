import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './auth/decorators/public.decorator'
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard'

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('new')
  @Public()
  newEndpoint(): string {
    return 'This is new'
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks()
  }
}
