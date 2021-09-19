import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchedMoviePage } from './watched-movie.page';

const routes: Routes = [
  {
    path: '',
    component: WatchedMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchedMoviePageRoutingModule {}
