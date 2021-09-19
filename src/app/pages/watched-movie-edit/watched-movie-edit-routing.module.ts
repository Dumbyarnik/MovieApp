import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchedMovieEditPage } from './watched-movie-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WatchedMovieEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchedMovieEditPageRoutingModule {}
