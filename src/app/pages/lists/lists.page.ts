import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  selectedView = 'watchlist';

  // for showing them on html page
  movies_want: any[] = [];  
  movies_watched: any[] = [];  

  constructor(private moviesService: MoviesService,  private route: Router,) {
    
  }

  ngOnInit(): void {
    this.loadMoviesToWatch();   
    this.loadMoviesWatched();
  }

  async loadMoviesToWatch(){
    // subscribing to movies to watch     
    this.moviesService.getMoviesToWatch().subscribe(res => {
      this.movies_want = [];
      this.movies_want = res;
    });
  }

  async loadMoviesWatched(){
    // subscribing to watched movies
    this.moviesService.getMoviesWatched().subscribe(res => {
      this.movies_watched = [];
      this.movies_watched = res;
    });
  }

async removeFromWatchlist(id: string){
  this.moviesService.deleteToWatchlist(id);
}

async addToDiary(id: string){
  this.route.navigate(['/search/edit/' + id]);
}

async saveToWatchlist(id: string){
  this.moviesService.saveToWatchlist(id);
}

async removeFromDiary(id: string){
  this.moviesService.deleteFromDiary(id);
}
}
