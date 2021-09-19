import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchedMovieEditPageRoutingModule } from './watched-movie-edit-routing.module';

import { WatchedMovieEditPage } from './watched-movie-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchedMovieEditPageRoutingModule
  ],
  declarations: [WatchedMovieEditPage]
})
export class WatchedMovieEditPageModule {}
