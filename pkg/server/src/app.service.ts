import { Injectable } from '@nestjs/common';
import * as data from '../data.json';

const PRIZES = <const>{
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
};

type PouchSize = keyof typeof PRIZES;

@Injectable()
export class AppService {
  getNextDeliveryById(userId: string) {
    const entity = data.find(({ id }) => id === userId);

    if (!entity) {
      throw 'Not found';
    }

    const cats = this.getCatsNames(entity.cats);
    const totalPrice = this.getTotalPrize(entity.cats);
    return {
      title: `Your next delivery for ${cats}`,
      message: `Hey ${entity.firstName}! In two days' time, we'll be charging you for your next order for ${cats}'s fresh food.`,
      totalPrice: totalPrice.toFixed(2),
      freeGift: totalPrice > 120,
    };
  }

  getCatsNames(cats: (typeof data)[0]['cats']): string {
    return cats
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .reduce((cats, { name }, i, arr) => {
        if (arr.length > 1 && arr.length - 1 === i) {
          cats = `${cats ? cats : ''} and ${name}`;
        } else {
          cats = `${cats ? `${cats}, ` : ''}${name}`;
        }

        return cats;
      }, '');
  }

  getTotalPrize(cats: (typeof data)[0]['cats']): number {
    return cats
      .filter(({ subscriptionActive }) => subscriptionActive)
      .reduce((totalPrice, { pouchSize }) => {
        return totalPrice + PRIZES[pouchSize as PouchSize];
      }, 0.0);
  }
}
