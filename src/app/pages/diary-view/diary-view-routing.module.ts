import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryViewPage } from './diary-view.page';

const routes: Routes = [
  {
    path: '',
    component: DiaryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryViewPageRoutingModule {}
