import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs/tab1/:id',
    loadChildren: () => import('./pages/movies-details/movies-details.module').then( m => m.MoviesDetailsPageModule)
  },
  {
    path: 'tabs/tab2/:id',
    loadChildren: () => import('./pages/watched-movie/watched-movie.module').then( m => m.WatchedMoviePageModule)
  },
  {
    path: 'tabs/tab2/edit/:id',
    loadChildren: () => import('./pages/watched-movie-edit/watched-movie-edit.module').then( m => m.WatchedMovieEditPageModule)
  }



  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
