import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/categories.dto'
import { Category } from '../../entities/category.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

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

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: randomUUID(),
      ...payload,
    }

    this.categories.push(newCategory)
    return newCategory
  }

  update(id: string, payload: UpdateCategoryDto) {
    const category = this.find(id)
    if (category) {
      const index = this.categories.findIndex((item) => item.id == id)
      this.categories[index] = {
        ...category,
        ...payload,
      }

      return payload
    }

    throw new NotFoundException(`User #${id} not found`)
  }

  delete(id: string) {
    this.categories == this.categories.filter((item) => item.id != id)
    return id
  }
}
