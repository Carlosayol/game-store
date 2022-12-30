import { Injectable, NotFoundException } from '@nestjs/common'
import { Customer } from '../../entities/customer.entity'
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto'
import { randomUUID } from 'crypto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

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

  create(payload: CreateCustomerDto) {
    const newCustomer = {
      id: randomUUID(),
      ...payload,
    }

    this.customers.push(newCustomer)
    return newCustomer
  }

  update(id: string, payload: UpdateCustomerDto) {
    const customer = this.find(id)
    if (customer) {
      const index = this.customers.findIndex((item) => item.id == id)
      this.customers[index] = {
        ...customer,
        ...payload,
      }

      return payload
    }

    throw new NotFoundException(`Customer #${id} not found`)
  }

  delete(id: string) {
    this.customers == this.customers.filter((item) => item.id != id)
    return id
  }
}
