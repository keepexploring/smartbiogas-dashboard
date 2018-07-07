import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.sass'],
})
export class ContactCardComponent implements OnInit, OnChanges {
  @Input() user: User;
  constructor() {}
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      this.user = changes.user.currentValue;
    }
  }
}
