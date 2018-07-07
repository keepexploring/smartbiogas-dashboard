import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { Card } from '../../models/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: Card;
  @Input() position: number;
  @Output() addCard: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.card) {
      // console.log(changes.card.currentValue);
      this.card = changes.card.currentValue;
    }
    if (changes.position) {
      this.position = changes.position.currentValue;
    }
  }

  navigate() {
    if (this.card.route) {
      this.router.navigate(this.card.route);
    }
  }

  create() {
    this.addCard.emit(this.position);
  }

  get linkText() {
    let name: string = this.card.template.entityName;
    if (this.card.value && name != '') {
      return name + 's';
    }
    return name;
  }
}
