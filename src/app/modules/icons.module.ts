import { NgModule } from '@angular/core';
import {
  IconLayers,
  IconCompass,
  IconUsers,
  IconTruck,
  IconLogIn,
  IconLogOut,
  IconList,
  IconMap,
  IconArrowRight,
  IconArrowLeft,
  IconAlignJustify,
  IconMenu,
  IconRefreshCw,
  IconChevronsRight,
  IconDownloadCloud,
} from 'angular-feather';

const icons = [
  IconLayers,
  IconCompass,
  IconUsers,
  IconTruck,
  IconLogIn,
  IconLogOut,
  IconList,
  IconMap,
  IconArrowRight,
  IconArrowLeft,
  IconAlignJustify,
  IconMenu,
  IconRefreshCw,
  IconChevronsRight,
  IconDownloadCloud,
];

@NgModule({
  exports: icons,
})
export class IconsModule {}
