import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoClasePageRoutingModule } from './info-clase-routing.module';

import { InfoClasePage } from './info-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoClasePageRoutingModule
  ],
  declarations: [InfoClasePage]
})
export class InfoClasePageModule {}
