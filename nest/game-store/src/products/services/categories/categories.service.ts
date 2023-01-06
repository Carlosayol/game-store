import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/categories.dto'
import { Category } from '../../entities/category.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  findAll() {
    return this.categoryModel.find().exec()
  }

  async find(id: string) {
    const category = await this.categoryModel.findById(id).exec()
    if (!category) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return category
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = new this.categoryModel(payload)
    return await newCategory.save()
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`)
    }

    return category
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndRemove(id)

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`)
    }

    return category
  }
}
