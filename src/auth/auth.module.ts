import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './services/auth/auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './controllers/auth/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import config from '@/config'
import { ConfigType } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        }
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
