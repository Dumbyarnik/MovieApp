import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'

export interface Movie{
  id: number;
  name: string;
  year: string;
  image: string;
}

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
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMoviesToWatch();   
  }

  async getMoviesToWatch(){
    // getting movies user wants to watch from storage
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    const movies_want_int = data[0].movies_want;

    for (var i in movies_want_int){
      // retrieving information about the movies
      let tmpMovie = {} as Movie;
      // here is pipe for unsubscribing after
      this.apiService.getDetails(movies_want_int[i]).pipe(first()).subscribe(result =>{
        this.information = result;
        tmpMovie.id = this.information.id;
        tmpMovie.name = this.information.original_title;
        tmpMovie.year = this.information.release_date;
        tmpMovie.image = 'https://image.tmdb.org/t/p/w500' 
          + this.information.poster_path;
      });
      this.movies_want.push(tmpMovie);
    }
  }

}
