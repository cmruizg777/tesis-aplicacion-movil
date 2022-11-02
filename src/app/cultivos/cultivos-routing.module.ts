import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CultivosPage } from './cultivos.page';

const routes: Routes = [
  {
    path: '',
    component: CultivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultivosPageRoutingModule {}
