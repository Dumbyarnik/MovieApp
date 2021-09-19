import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchedMoviePageRoutingModule } from './watched-movie-routing.module';

import { WatchedMoviePage } from './watched-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchedMoviePageRoutingModule
  ],
  declarations: [WatchedMoviePage]
})
export class WatchedMoviePageModule {}
