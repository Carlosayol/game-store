import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'
import { Role } from '@/auth/models/roles.model'
import { Token } from '@/auth/models/token.model'
import { OrdersService } from '@/users/services/orders/orders.service'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as Token
    return this.orderService.ordersByCustomer(user.sub)
  }
}
