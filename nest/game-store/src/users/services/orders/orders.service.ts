import { Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Order } from '../../entities/order.entity'
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/orders.dto'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec()
  }

  async find(id: string) {
    const order = await this.orderModel.findById(id).exec()
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`)
    }

    return order
  }

  async create(payload: CreateOrderDto) {
    const newModel = new this.orderModel(payload)
    return await newModel.save()
  }

  async update(id: string, payload: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, { $set: payload }, { new: true }).exec()

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`)
    }

    return order
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndRemove(id)

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`)
    }

    return order
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id)
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`)
    }

    order.products.pull(productId)

    return order.save()
  }

  async addProducts(id: string, productIds: string[]) {
    const order = await this.orderModel.findById(id)
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`)
    }

    productIds.map((productId) => {
      order.products.push(productId)
    })

    return order.save()
  }
}
