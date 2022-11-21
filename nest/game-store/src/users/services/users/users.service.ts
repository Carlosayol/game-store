import { ProductsService } from '@/products/services/products/products.service'
import { CreateUserDto, UpdateUserDto } from '@/users/dtos/users.dto'
import { Order } from '@/users/entities/order.entity'
import { User } from '@/users/entities/user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private users: User[] = [
    {
      id: '1',
      email: 'test@test.com',
      password: 'test1234',
      role: 'admin',
    },
  ]

  findAll() {
    const apiKey = this.configService.get('API_KEY')
    console.log(apiKey)
    return this.users
  }

  find(id: string) {
    const user = this.users.find((item) => item.id == id)
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return user
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      ...payload,
    }

    this.users.push(newUser)
    return newUser
  }

  update(id: string, payload: UpdateUserDto) {
    const user = this.find(id)
    if (user) {
      const index = this.users.findIndex((item) => item.id == id)
      this.users[index] = {
        ...user,
        ...payload,
      }

      return payload
    }

    throw new NotFoundException(`User #${id} not found`)
  }

  delete(id: string) {
    this.users == this.users.filter((item) => item.id != id)
    return id
  }

  getOrderByUser(id: string): Order {
    const user = this.find(id)
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    }
  }
}
