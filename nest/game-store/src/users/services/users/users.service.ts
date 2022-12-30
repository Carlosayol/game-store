import { ProductsService } from '../../../products/services/products/products.service'
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto'
import { Order } from '../../entities/order.entity'
import { User } from '../../entities/user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY')
    console.log(apiKey)
    return this.userModel.find().exec()
  }

  async find(id: string) {
    const user = await this.userModel.findById(id).exec()
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

  async getOrderByUser(id: string) {
    const user = this.find(id)
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    }
  }
}
