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
  currentLength: number = 0;

  emptyCard = new Card();
  constructor(private service: DashboardService) {}

  ngOnInit() {
    this.getTemplateCards();
  }

  getTemplateCards() {
    this.loadingText = 'Loading Templates';
    this.loadingTemplates = true;
    this.service.getTemplateCards().subscribe(items => {
      this.cardTemplates = items;
      this.loadingTemplates = false;
      this.getCards(false);
    });
  }

  selectTemplate(position: number) {
    this.setupSelection();
    this.selectedPosition = position;
    if (!this.cardTemplates) {
      this.getTemplateCards();
    }
  }

  getCards(refresh: boolean = false) {
    if (!this.service.loadedCardsForTheFirstTime) {
      this.loadingText = 'Loading Cards';
      this.loading = true;
    }

    this.service.getCards(refresh).subscribe(
      items => {
        this.cards = items;
        if (!this.service.loadedCardsForTheFirstTime) {
          this.currentLength = this.cards.length;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      },
    );
  }

  addCard(template: CardTemplate) {
    this.resetSelection();
    this.loadingText = 'Adding card to dashboard';
    this.currentLength = this.cards.length + 1;

    this.resetSelection();
    const card = new Card();
    card.template = template;
    card.isLoading = true;
    card.isNew = false;
    this.cards.push(card);

    this.service.addCardToDashboard(this.currentLength, template.id).subscribe(
      () => {
        this.getCards(true);
      },
      error => {
        this.cards.splice(-1, 1);
        this.currentLength = this.currentLength - 1;
        this.service.loadedCardsForTheFirstTime = false;
        this.getCards(true);
        console.log('err!!', error);
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
