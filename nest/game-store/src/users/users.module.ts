import { ProductsModule } from '../products/products.module'
import { Module } from '@nestjs/common'
import { CustomersController } from './controllers/customers/customers.controller'
import { UsersController } from './controllers/users/users.controller'
import { CustomersService } from './services/customers/customers.service'
import { UsersService } from './services/users/users.service'
import { OrdersController } from './controllers/orders/orders.controller'
import { OrdersService } from './services/orders/orders.service'

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
