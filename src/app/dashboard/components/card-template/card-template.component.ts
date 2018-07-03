import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardTemplate } from '../../models/card-template';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.sass'],
})
export class CardTemplateComponent implements OnInit {
  @Input() template: CardTemplate;
  @Output() templateSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  selectTemplate() {
    this.templateSelected.emit(this.template);
  }
}
