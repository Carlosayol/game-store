import { ProductsService } from '@/products/services/products/products.service'
import { CreateUserDto, UpdateUserDto } from '@/users/dtos/users.dtos'
import { Order } from '@/users/entities/order.entity'
import { User } from '@/users/entities/user.entity'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string,
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
