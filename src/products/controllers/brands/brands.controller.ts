import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brands.dto'
import { BrandsService } from '../../services/brands/brands.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  // @Get('test')
  // getTests() {
  //   return this.brandService.testDatabase()
  // }

  @Get()
  getPage() {
    return this.brandService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.brandService.find(id)
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandService.delete(id)
  }
}
