import { Injectable } from '@nestjs/common';
import { hostages } from './app.data';

import puppeteer from 'puppeteer';
import { randomUUID } from 'crypto';
import { Hostage, News } from './app.interfaces';
import { URL } from 'url';

@Injectable()
export class AppService {
  getAll(): Partial<Hostage>[] {
    return hostages.map((hostage) => ({
      ...hostage,
      id: randomUUID(),
      news: { hebrew: [], english: [] },
      urlName: hostage.englishName.toLowerCase().split(' ').join('-'),
    }));
  }

  getByName(n: string): Partial<Hostage>[] {
    return this.getAll().filter(
      ({ name, englishName }) => name.includes(n) || englishName.includes(n),
    );
  }

  async getNewsByName(name: string, lang = 'he') {
    const person = this.getByName(name)?.shift();
    if (!person) return;
    person.news[lang] = await this.scrapeNewsByName(person, lang);
    return person;
  }

  private getLink(x: HTMLElement) {
    const link = x.querySelector('a')?.href;
    if (!link) return;
    const url = new URL(link);
    const decoded = url.pathname.replace('/articles/', '');
    const encoded = btoa(decoded);
    return encoded;
  }

  private async scrapeNewsByName(
    person: Partial<Hostage>,
    lang: string = 'he',
  ): Promise<News[]> {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const [page] = await browser.pages();
      await page.goto(`https://news.google.com/home?hl=${lang}`, {
        waitUntil: 'networkidle0',
      });
      const name = lang !== 'he' ? person.englishName : person.name;
      await page.type('[type="text"]', name);
      await page.keyboard.press('Enter');

      const data = await page.$$eval('article', (articles) => {
        return articles.map((article) => ({
          title: article.querySelector('h3 a')?.textContent,
          link: article.querySelector('a').href,
          time: article.querySelector('time')?.textContent,
          img: article.querySelector('img')?.src,
        }));
      });

      await page.close();
      await browser.close();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
