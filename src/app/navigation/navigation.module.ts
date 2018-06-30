import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { IconsModule } from '../icons/icons.module';
import { RouterModule } from '@angular/router';
import { MainNavigationLinksComponent } from './components/main-navigation-links/main-navigation-links.component';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';

@NgModule({
  imports: [CommonModule, SharedModule, CoreModule, IconsModule, RouterModule],
  declarations: [
    NavSidebarComponent,
    NavTopComponent,
    MainNavigationLinksComponent,
    NavMobileComponent,
  ],
  exports: [NavSidebarComponent, NavTopComponent, NavMobileComponent],
})
export class NavigationModule {}
