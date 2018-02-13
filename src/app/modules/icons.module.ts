import { NgModule } from '@angular/core';
import { IconLayers, IconCompass, IconUsers, IconTruck, IconLogIn, IconLogOut } from 'angular-feather';

const icons = [
  IconLayers,
  IconCompass,
  IconUsers,
  IconTruck,
  IconLogIn,
  IconLogOut
];

@NgModule({
  declarations: icons,
  exports: icons
})

export class IconsModule { }