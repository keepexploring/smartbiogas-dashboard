import { HttpResponse } from '@angular/common/http';
import { CardTemplate } from './card-template';

export class Card {
  id: number;
  created: string;
  card_template: {
    id: number;
    name: string;
  };
  position: number;
  updated: string;
  value: string;

  template: CardTemplate;

  // Check if it should be a new one
  isNew: boolean = true;

  get route() {
    let route: string[] = this.template.entityRoute;
    if (this.value) {
      route.push(this.value);
    }
    return route;
  }

  static fromResponse(response: HttpResponse<any>) {
    return response.body.data.map(item => {
      return this.parseSingle(item);
    });
  }

  static parseSingle(data: any): Card {
    const item = new Card();
    item.id = data.id;
    item.created = data.created;
    item.card_template = data.card_template;
    item.position = data.position;
    item.updated = data.updated;
    item.value = data.value || '';
    item.isNew = false;
    return item;
  }
}
