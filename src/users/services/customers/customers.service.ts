import { Injectable, NotFoundException } from '@nestjs/common'
import { Customer } from '../../entities/customer.entity'
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

  findAll() {
    return this.customerModel.find().exec()
  }

  async find(id: string) {
    const customer = await this.customerModel.findById(id).exec()
    if (!customer) {
      throw new NotFoundException(`User ${id} not found`)
    }

    return customer
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = new this.customerModel(payload)
    return await newCustomer.save()
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const customer = await this.customerModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`)
    }

    return customer
  }

  async delete(id: string) {
    const customer = await this.customerModel.findByIdAndRemove(id)
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`)
    }

    return customer
  }
}
