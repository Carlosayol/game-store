import { Controller, Get, Param } from '@nestjs/common'
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

  @Get('products/:id')
  getProduct(@Param('id') id: string): string {
    return `product ${id}`
  }

  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): string {
    return `category ${id} and product ${productId}`
  }
}
