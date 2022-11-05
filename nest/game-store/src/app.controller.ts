import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('new')
  newEndpoint(): string {
    return 'This is new'
  }

  // the methods work with slash or without it when resolving routes
  @Get('/a/')
  hello(): string {
    return 'with /a/'
  }
}
