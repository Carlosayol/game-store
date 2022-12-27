import config from '@/config'
import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongoClient } from 'mongodb'

const API_KEY = '1234'
@Global()
@Module({
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
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
