import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies/movies.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

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

async removeFromWatchList(item){
  this.moviesService.deleteToWatchlist(item.id);
}

async addtoWatched(item){
  this.route.navigate(['/tabs/tab2/edit/' + item.id]);
}

}
