import { Product } from '@/entities/product.entity'
import { Injectable } from '@nestjs/common'
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
    return this.products.find((item) => item.id == id)
  }

  create(payload: any) {
    const newProduct = {
      id: randomUUID(),
      ...payload,
    }

    this.products.push(newProduct)
    return newProduct
  }

  update(id: string, payload: any) {
    const index = this.products.findIndex((item) => item.id == id)
    this.products[index] = payload

    return payload
  }

  delete(id: string) {
    this.products == this.products.filter((item) => item.id != id)
    return id
  }
}
