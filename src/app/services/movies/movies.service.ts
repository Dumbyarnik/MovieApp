import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api/api.service';
import { first } from 'rxjs/operators'

export interface Movie{
  id: number;
  name: string;
  year: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private information = null;
  movies_want: any[] = [];
  movies_want_behaviour = new BehaviorSubject([]);

  constructor(private apiService: ApiService) { 
    this.loadMoviesToWatch();
  }

  getMoviesToWatch(): Observable<any> {
    return this.movies_want_behaviour.asObservable();
  }

  async loadMoviesToWatch(){
    // getting movies user wants to watch from storage
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    const movies_want_int = data[0].movies_want;

    this.movies_want = [];

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

    this.movies_want_behaviour.next(this.movies_want);
  }
}
