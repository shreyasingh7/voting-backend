import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({title: 'To get the version.'})
  @Get()
  get() {
    return this.appService.getVersion()
  }
}
