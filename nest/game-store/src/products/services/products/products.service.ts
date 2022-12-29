import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto'
import { Product } from '../../entities/product.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec()
  }

  async find(id: string) {
    const product = await this.productModel.findById(id).exec()
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`)
    }

    return product
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: randomUUID(),
      ...payload,
    }

    this.products.push(newProduct)
    return newProduct
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.find(id)
    if (product) {
      const index = this.products.findIndex((item) => item.id == id)
      this.products[index] = {
        ...product,
        ...payload,
      }

      return payload
    }

    return null
  }

  delete(id: string) {
    this.products == this.products.filter((item) => item.id != id)
    return id
  }
}
