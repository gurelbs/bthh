import { Injectable } from '@nestjs/common';
import {hostages} from './app.data';

@Injectable()
export class AppService {
  getAll() {
    return hostages;
  };

  getByName(n: string, exact = false) {
      return !exact 
      ? hostages.filter((hostage) => hostage.name.startsWith(n)) 
      : hostages.findIndex(({name}) => name === n);
  }

  async getNewsByName(name: string) {
    let personData = this.getByName(name, true);
    if (Array.isArray(personData)) {
      return { error: 'more than one' }
    };
    // const news  = await this.scrapeNewsByName(hostages['name']);

    //   const data = {...personData, news: null };
    //   // data.news = await this.scrapeNewsByName(name);
    //   return data;
    // }
    // return {};
  }

  async scrapeNewsByName(name: string){
    return { news: []}
  }
}
