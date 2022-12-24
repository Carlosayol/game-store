import { Global, Module } from '@nestjs/common'
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
      useFactory: async () => {
        const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT'
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('game-store')

        return database
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
