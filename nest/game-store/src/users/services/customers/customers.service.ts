import { Injectable, NotFoundException } from '@nestjs/common'
import { Customer } from '@/users/entities/customer.entity'
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@/users/dtos/customers.dtos'
import { randomUUID } from 'crypto'

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: '1',
      name: 'test@test.com',
      lastName: 'test1234',
      phone: '+573024318825',
    },
  ]

  findAll() {
    return this.customers
  }

  find(id: string) {
    const customer = this.customers.find((item) => item.id == id)
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
