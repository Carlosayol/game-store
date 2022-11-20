import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import config from './config'

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    console.log(this.tasks)
    return this.configService.apiKey
  }
}
