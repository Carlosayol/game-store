import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { HttpModule, HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [HttpModule, UsersModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasksT = http.get('https://jsonplaceholder.typicode.com/todos')
        const tasks = await firstValueFrom(tasksT)

        return tasks.data
      },
    },
  ],
})
export class AppModule {}
