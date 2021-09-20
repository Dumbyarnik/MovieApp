import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryViewPageRoutingModule } from './diary-view-routing.module';

import { DiaryViewPage } from './diary-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryViewPageRoutingModule
  ],
  declarations: [DiaryViewPage]
})
export class DiaryViewPageModule {}
