import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoClasePage } from './info-clase.page';

const routes: Routes = [
  {
    path: '',
    component: InfoClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoClasePageRoutingModule {}
