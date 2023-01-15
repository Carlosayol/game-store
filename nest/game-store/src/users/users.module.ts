import { ProductsModule } from '../products/products.module'
import { Module } from '@nestjs/common'
import { CustomersController } from './controllers/customers/customers.controller'
import { UsersController } from './controllers/users/users.controller'
import { CustomersService } from './services/customers/customers.service'
import { UsersService } from './services/users/users.service'
import { OrdersController } from './controllers/orders/orders.controller'
import { OrdersService } from './services/orders/orders.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from './entities/customer.entity'
import { User, UserSchema } from './entities/user.entity'
import { Order, OrderSchema } from './entities/order.entity'
import { ProfileController } from './controllers/profile/profile.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController, ProfileController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
