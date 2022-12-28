import config from '@/config'
import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoClient } from 'mongodb'

const API_KEY = '1234'
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, port, user, password, host, dbName } =
          configService.mongo
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        }
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, port, user, password, host } = configService.mongo
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('game-store')

        return database
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
