import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ProductsService } from '../../services/products/products.service'
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../../dtos/products.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MongoIdPipe } from '@/common/mongo-id/mongo-id.pipe'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth/jwt-auth.guard'
import { Public } from '@/auth/decorators/public.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { Role } from '@/auth/models/roles.model'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get list of products' })
  getPage(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params)
  }

  @Public()
  @Get('filter')
  getFilter(): string {
    return `hello filter`
  }

  @Public()
  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.find(id)
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id)
  }
}
