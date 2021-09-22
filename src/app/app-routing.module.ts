import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'lists',
    loadChildren: () => import('./pages/lists/lists.module').then(m => m.ListsPageModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./pages/storage/storage.module').then(m => m.StoragePageModule)
  },
  {
    path: 'search/:id',
    loadChildren: () => import('./pages/movies-details/movies-details.module').then( m => m.MoviesDetailsPageModule)
  },
  {
    path: 'search/edit/:id',
    loadChildren: () => import('./pages/watched-movie-edit/watched-movie-edit.module').then( m => m.WatchedMovieEditPageModule)
  },
  {
    path: 'lists/diary/:id',
    loadChildren: () => import('./pages/diary-view/diary-view.module').then( m => m.DiaryViewPageModule)
  },
  {
    path: 'lists/diary/edit/:id',
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
