import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get([':name/news'])
  getNewsByName(@Param('name') name: string) {
    return this.appService.getNewsByName(name);
  }

  @Get([':name/news/:lang'])
  getNewsByLang(@Param('name') name: string, @Param('lang') lang: string) {
    return this.appService.getNewsByName(name, lang);
  }

}
