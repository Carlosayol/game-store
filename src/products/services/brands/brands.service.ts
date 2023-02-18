import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brands.dto'
import { Brand } from '../../entities/brand.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec()
  }

  async find(id: string) {
    const brand = await this.brandModel.findById(id).exec()
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`)
    }

    return brand
  }

  async create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload)
    return await newBrand.save()
  }

  async update(id: string, payload: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`)
    }

    return brand
  }

  async delete(id: string) {
    const brand = await this.brandModel.findByIdAndRemove(id)
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`)
    }

    return brand
  }

  // testDatabase() {
  //   const tasksCollection = this.database.collection('tasks')
  //   return tasksCollection.find().toArray()
  // }
}
