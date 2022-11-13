import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiclosPageRoutingModule } from './ciclos-routing.module';

import { CiclosPage } from './ciclos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiclosPageRoutingModule
  ],
  declarations: [CiclosPage]
})
export class CiclosPageModule {}
