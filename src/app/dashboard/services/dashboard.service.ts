import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { HelpersService } from '../../core/services/helpers.service';
import { EndpointService } from '../../core/services/endpoint.service';
import { Dashboard } from '../models/dashboard';
import { Card } from '../models/card';
import { CardTemplate } from '../models/card-template';
import { MessageService } from '../../core/services/message.service';
import { Message } from '../../shared/models/message';
import { MessageType } from '../../shared/enums/message-type';

@Injectable()
export class DashboardService {
  cards: Card[] = [];
  cardTemplates: CardTemplate[] = [];

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
    private messageService: MessageService,
  ) {}

  getCards(refresh: boolean = false) {
    let request;
    if (refresh) {
      request = this.getFreshCards();
    } else {
      request = this.getCachedCards();
    }
    return request.pipe(
      map((response: HttpResponse<any>) => {
        const items = Card.fromResponse(response);
        this.cards = items;
        return items;
      }),
    );
  }

  private getCachedCards() {
    return this.http.get(this.endpoints.dashboard.cards, {
      observe: 'response',
    });
  }
  private getFreshCards() {
    return this.http.get(this.endpoints.dashboard.cards, {
      headers: new HttpHeaders({ 'x-requested-with': 'true' }),
      observe: 'response',
    });
  }

  getTemplateCards() {
    return this.http
      .get(this.endpoints.dashboard.templateCards, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const items = CardTemplate.fromResponse(response);
          this.cardTemplates = items;
          return items;
        }),
      );
  }

  modifyCardOrder(cards: Card[]) {
    const body = cards.filter(card => !!card.id).map(card => {
      // return { id: card.id, position: card.position };
      return [card.id, card.position];
    });

    return this.http.put(this.endpoints.dashboard.modifyCardOrder, body, { observe: 'response' });
  }

  addCardToDashboard(position: number, template_id: number): Observable<any> {
    return this.http
      .post(this.endpoints.dashboard.addCard, { position, template_id }, { observe: 'response' })
      .pipe(
        map((response: any) => {
          this.messageService.add(new Message(response.body.message, MessageType.Success));
          return response;
        }),
        catchError(error => {
          this.helpers.handleResponseError(error);
          this.messageService.add(new Message(error, MessageType.Danger));
          return of(error);
        }),
      );
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get(this.endpoints.dashboard.index).pipe(
      map(response => this.mapDataToModel(response)),
      catchError(this.helpers.handleResponseError),
    );
  }

  private mapDataToModel(response: any): Dashboard {
    let firstDataObject = response.objects[0];
    let item = new Dashboard();
    item.id = firstDataObject.id;
    item.activePlants = firstDataObject.active;
    item.repairTime = firstDataObject.avtime;
    item.faults = firstDataObject.faults;
    item.faultsFixed = firstDataObject.fixed;
    item.jobs = firstDataObject.jobs;
    item.plants = firstDataObject.plants;
    item.createdAt = firstDataObject.created_at;
    return item;
  }
}
