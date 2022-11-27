import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto'
import { Product } from '../../entities/product.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'game 1',
      description: 'placeholder',
      price: 10,
      image: '',
      stock: 10,
    },
  ]

  findAll() {
    return this.products
  }

  find(id: string) {
    const product = this.products.find((item) => item.id == id)
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
