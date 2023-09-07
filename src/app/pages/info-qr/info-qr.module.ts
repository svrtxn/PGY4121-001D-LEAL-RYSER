import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoQrPageRoutingModule } from './info-qr-routing.module';

import { InfoQrPage } from './info-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoQrPageRoutingModule
  ],
  declarations: [InfoQrPage]
})
export class InfoQrPageModule {}
