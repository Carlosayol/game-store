import { ROLES_KEY } from '@/auth/decorators/roles.decorator'
import { Role } from '@/auth/models/roles.model'
import { Token } from '@/auth/models/token.model'
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler())
    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as Token
    const isAuth = roles.includes(user.role as Role)
    if (!isAuth) {
      throw new ForbiddenException('role is not valid')
    }

    return isAuth
  }
}
