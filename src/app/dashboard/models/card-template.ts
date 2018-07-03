import { HttpResponse } from '@angular/common/http';

export class CardTemplate {
  id: number;
  card_type: string;
  description: string;
  entity_type: string;
  image: string;
  name: string;
  title: string;
  created: string;
  updated: string;

  get entityName(): string {
    switch (this.entity_type.toLowerCase()) {
      case 'biogasplant':
        return 'Plant';
      case 'technician':
        return 'Technician';
      case 'job':
        return 'Job';
      default:
        return '';
    }
  }

  get entityRoute(): string[] {
    let route: string[];
    switch (this.entity_type.toLowerCase()) {
      case 'biogasplant':
        route = ['/plants'];
      case 'technician':
        route['/technician'];
      case 'job':
        route['/job'];
      default:
        route['/'];
    }
    return route;
  }

  static fromResponse(response: HttpResponse<any>): CardTemplate[] {
    return response.body.data.map(item => {
      return CardTemplate.parseSingle(item);
    });
  }

  static parseSingle(data: any): CardTemplate {
    const item = new CardTemplate();
    item.id = data.id;
    item.card_type = data.card_type;
    item.description = data.description;
    item.entity_type = data.entity_type;
    item.image = data.image;
    item.name = data.name;
    item.title = data.title;
    item.created = data.created;
    item.updated = data.updated;

    return item;
  }
}
