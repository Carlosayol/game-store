import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brands.dto'
import { Brand } from '../../entities/brand.entity'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { Db } from 'mongodb'

@Injectable()
export class BrandsService {
  constructor(@Inject('MONGO') private database: Db) {}

  private brands: Brand[] = [
    {
      id: '1',
      name: 'action',
      image: 'testimage.com',
    },
  ]

  findAll() {
    return this.brands
  }

  find(id: string) {
    const brand = this.brands.find((item) => item.id == id)
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`)
    }

    return brand
  }

  create(payload: CreateBrandDto) {
    const newCategory = {
      id: randomUUID(),
      ...payload,
    }

    this.brands.push(newCategory)
    return newCategory
  }

  update(id: string, payload: UpdateBrandDto) {
    const brand = this.find(id)
    if (brand) {
      const index = this.brands.findIndex((item) => item.id == id)
      this.brands[index] = {
        ...brand,
        ...payload,
      }

      return payload
    }

    throw new NotFoundException(`Brand #${id} not found`)
  }

  delete(id: string) {
    this.brands == this.brands.filter((item) => item.id != id)
    return id
  }

  testDatabase() {
    const tasksCollection = this.database.collection('tasks')
    return tasksCollection.find().toArray()
  }
}
