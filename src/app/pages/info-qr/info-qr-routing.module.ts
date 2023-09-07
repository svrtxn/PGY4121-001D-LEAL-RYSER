import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoQrPage } from './info-qr.page';

const routes: Routes = [
  {
    path: '',
    component: InfoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoQrPageRoutingModule {}
