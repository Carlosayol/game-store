import { ProductsService } from '../../../products/services/products/products.service'
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto'
import { Order } from '../../entities/order.entity'
import { User } from '../../entities/user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { FilterProductsDto } from '@/products/dtos/products.dto'

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

  async create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload)
    return await newUser.save()
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()

    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }

    return user
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndRemove(id)

    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }

    return user
  }

  async getOrderByUser(id: string) {
    const user = this.find(id)
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll({
        limit: 1,
        offset: 0,
      } as FilterProductsDto),
    }
  }
}
