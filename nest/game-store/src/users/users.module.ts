import { Module } from '@nestjs/common'
import { CustomersController } from './controllers/customers/customers.controller'
import { UsersController } from './controllers/users/users.controller'
import { CustomersService } from './services/customers/customers.service'
import { UsersService } from './services/users/users.service'

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
