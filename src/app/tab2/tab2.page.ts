import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { MoviesService } from '../services/movies/movies.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  // for showing them on html page
  movies_want: any[] = [];
  // for retrieving infor about the movie 
  information = null;
  

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.LoadMoviesToWatch();   
  }

  async LoadMoviesToWatch(){
    // subscribing to movies to watch     
    this.moviesService.getMoviesToWatch().subscribe(res => {
      this.movies_want = null;
      this.movies_want = res;
    });
  }

}
