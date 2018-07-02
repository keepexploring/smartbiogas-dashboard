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
  IconPlusSquare,
  IconEdit,
  IconEye,
  IconEyeOff,
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
  IconPlusSquare,
  IconEdit,
  IconEye,
  IconEyeOff,
];

@NgModule({
  exports: icons,
})
export class IconsModule {}
