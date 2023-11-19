import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    console.log(name);
    return this.appService.getByName(name);
  }

  @Get(':name/news')
  getNewsByName(@Param('name') name: string) {
    return this.appService.getNewsByName(name);
  }
}
