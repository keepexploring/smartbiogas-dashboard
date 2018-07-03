import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CardTemplate } from '../../models/card-template';
import { Card } from '../../models/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  loadingTemplates: boolean = true;
  cardTemplates: CardTemplate[];
  cards: Card[];
  selectingTemplate: boolean = false;

  loadingText = 'Loading Cards';

  selectedPosition: number;

  constructor(private service: DashboardService) {}

  ngOnInit() {
    this.getTemplateCards();
  }

  getCards() {
    this.loadingText = 'Loading Cards';
    this.loading = true;
    this.service.getCards().subscribe(
      items => {
        console.log(this.cardTemplates);
        const cards = items.map(item => {
          const template = this.cardTemplates.find(t => t.id === item.card_template.id);

          item.template = template;
          return item;
        });

        console.log(cards);

        this.cards = [...cards, new Card()];
      },
      null,
      () => {
        this.loading = false;
      },
    );
  }

  getTemplateCards() {
    this.loadingText = 'Loading Templates';
    this.loadingTemplates = true;
    this.service.getTemplateCards().subscribe(items => {
      this.cardTemplates = items;
      this.loadingTemplates = false;
      this.getCards();
    });
  }

  selectTemplate(position: number) {
    this.setupSelection();
    this.selectedPosition = position;
    if (!this.cardTemplates) {
      this.getTemplateCards();
    }
  }

  addCard(template: CardTemplate) {
    this.loadingText = 'Adding card to dashboard';
    this.loading = true;
    this.service.addCardToDashboard(this.selectedPosition, template.id).subscribe(
      success => {
        console.log(success);
        this.resetSelection();
        this.getCards();
        // Loading handled in getCards
      },
      error => {
        console.log('err!!', error);
        this.loading = false;
      },
    );
  }

  setupSelection() {
    this.selectingTemplate = true;
  }

  resetSelection() {
    this.selectingTemplate = false;
    this.selectedPosition = null;
  }
}
