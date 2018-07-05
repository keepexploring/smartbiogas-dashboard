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

  getCards(refresh: boolean = false) {
    this.loadingText = 'Loading Cards';
    this.loading = true;
    this.service.getCards(refresh).subscribe(
      items => {
        const cards = items.map(item => {
          const template = this.cardTemplates.find(t => t.id === item.card_template.id);
          item.template = template;
          return item;
        });
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
      this.getCards(true);
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
      () => {
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

  onDragStart(event: any) {
    event.dataTransfer.dropEffect = 'none';
  }

  onDrop(e: any, newIndex) {
    event.preventDefault();
    this.moveToIndex(this.cards, e.dragData, newIndex);
    this.cards = this.cards.map((card, index) => {
      card.position = index + 1;
      return card;
    });
    this.service.modifyCardOrder(this.cards).subscribe(
      success => {},
      error => {
        console.log('error', error);
      },
    );
  }

  moveToIndex(list, from, to) {
    let cutOut = list.splice(from, 1)[0];
    list.splice(to, 0, cutOut);
  }
}
