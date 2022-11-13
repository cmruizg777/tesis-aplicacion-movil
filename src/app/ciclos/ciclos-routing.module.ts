import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CiclosPage } from './ciclos.page';

const routes: Routes = [
  {
    path: '',
    component: CiclosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CiclosPageRoutingModule {}
