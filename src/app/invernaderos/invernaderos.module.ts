import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvernaderosPageRoutingModule } from './invernaderos-routing.module';

import { InvernaderosPage } from './invernaderos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvernaderosPageRoutingModule
  ],
  declarations: [InvernaderosPage]
})
export class InvernaderosPageModule {}
