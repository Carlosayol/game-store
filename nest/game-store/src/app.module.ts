import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { HttpModule, HttpService } from '@nestjs/axios'
import { DatabaseModule } from './database/database.module'
import { MongoClient } from 'mongodb'
import config from './config'

const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT'
const client = new MongoClient(uri)

async function run() {
  await client.connect()
  const database = client.db('game-store')
  const taskCollection = database.collection('tasks')
  const tasks = await taskCollection.find().toArray()
  console.log(tasks)
}

run()

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise()
        return tasks.data
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
