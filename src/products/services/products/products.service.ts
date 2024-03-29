import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../../dtos/products.dto'
import { Product } from '../../entities/product.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(params: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {}
      const { limit, offset } = params
      const { minPrice, maxPrice } = params

      if (minPrice && maxPrice) {
        filters.price = { $gt: minPrice, $lte: maxPrice }
      }

      return await this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset * limit)
        .limit(limit)
        .exec()
    }

    return await this.productModel.find().populate('brand').exec()
  }

  async find(id: string) {
    const product = await this.productModel.findById(id).exec()
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`)
    }

    return product
  }

  async create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload)
    return await newProduct.save()
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }

    return product
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndRemove(id)
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }

    return product
  }
}
