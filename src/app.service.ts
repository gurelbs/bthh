import { Injectable } from '@nestjs/common';
import { hostages } from './app.data';

import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getAll() {
    return hostages;
  }

  getByName(n: string) {
    return hostages.filter((hostage) => hostage.name.startsWith(n));
  }


  getNewsByName(name: string) {

    const persons = this.getByName(name);

    persons.map(async (person) => {
      const updateNews = await this.scrapeNewsByName(person.name);

      if (!person.news) {
        person.news = updateNews;
        return;
      }

      const news = new Set(person.news);
      const newItems = updateNews.filter((item) => !news.has(item));
      return !newItems.length 
        ? Array.from(news) 
        : [...news, ...newItems];
    });

    return persons;
  }

  private async scrapeNewsByName(name: string) {
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();

    await page.goto('https://news.google.com', { waitUntil: 'networkidle0' });
    await page.type('[type="text"]', name);
    await page.keyboard.press('Enter');

    const data = await page.$$eval('article', (articles) => {
      return articles.map((article) => ({
        title: article.querySelector('h3 a')?.textContent,
        link: article.querySelector('a')?.href,
        time: article.querySelector('time')?.textContent,
        img: article.querySelector('img')?.src,
      }));
    });

    console.log(data);
    

    await browser.close();
    return data;
  }
}
