import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('brands')
export class BrandsController {
  @Get('brands')
  getPage(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `brands ${limit} ${offset}`
  }

  @Get('brands/:id')
  get(@Param('id') id: string): string {
    return `brand ${id}`
  }
}
