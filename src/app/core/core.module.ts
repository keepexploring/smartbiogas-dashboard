import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryInformation } from '../shared/models/country-information.model';
import { ConnectionStatusService } from './services/connection-status.service';
import { EndpointService } from './services/endpoint.service';
import { HelpersService } from './services/helpers.service';
import { MessageService } from './services/message.service';
import { NavigationHistoryService } from './services/navigation-history.service';
import { httpInterceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule],
  providers: [
    httpInterceptorProviders,
    ConnectionStatusService,
    CountryInformation,
    EndpointService,
    HelpersService,
    MessageService,
    NavigationHistoryService,
    MessageService,
    AuthGuard,
  ],
})
export class CoreModule {}
