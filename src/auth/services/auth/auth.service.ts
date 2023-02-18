import { Token } from '@/auth/models/token.model'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/services/users/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      return null
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
      const { password, ...rta } = user.toJSON()
      return rta
    }

    return null
  }

  generateJWT(user: User) {
    const payload: Token = { role: user.role, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
