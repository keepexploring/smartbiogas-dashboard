import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryInformation } from '../models/country-information.model';
import { ConnectionStatusService } from './services/connection-status.service';
import { EndpointService } from './services/endpoint.service';
import { HelpersService } from './services/helpers.service';
import { MessageService } from './services/message.service';
import { NavigationHistoryService } from './services/navigation-history.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ConnectionStatusService,
    CountryInformation,
    EndpointService,
    HelpersService,
    MessageService,
    NavigationHistoryService,
  ],
})
export class CoreModule {}
