import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/products/dtos/categories.dto'
import { Category } from '@/products/entities/category.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: '1',
      name: 'action',
    },
  ]

  findAll() {
    return this.categories
  }

  find(id: string) {
    const category = this.categories.find((item) => item.id == id)
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
