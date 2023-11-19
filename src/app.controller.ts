import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/:name')
  getByName(@Param('name') name: string) {
    const result = this.appService.getByName(name);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('/:name/news')
  getNewsByName(@Param('name') name: string) {
    const result = this.appService.getNewsByName(name);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('/:name/news/:lang')
  getNewsByLang(@Param('name') name: string, @Param('lang') lang: string) {
    const result = this.appService.getNewsByName(name, lang);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('*')
  notFound() {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
