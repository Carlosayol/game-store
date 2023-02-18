import { ProductsService } from '../../../products/services/products/products.service'
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto'
import { User } from '../../entities/user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { FilterProductsDto } from '@/products/dtos/products.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec()
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec()
    if (!user) {
      throw new NotFoundException(`User ${email} not found`)
    }

    return user
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
    const hashPassword = await bcrypt.hash(newUser.password, 10)
    newUser.password = hashPassword
    const model = await newUser.save()
    const { password, ...rta } = model.toJSON()

    return rta
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
