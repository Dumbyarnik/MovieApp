import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api/api.service';
import { first } from 'rxjs/operators'

export interface Movie{
  id: string;
  name: string;
  year: string;
  image: string;
  stars: string;
  isInWatchlist: boolean;
  isInDiary: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  // storing information about one movie
  information = null;


  //// observable

  // variables for watchlist
  movies_want: any[] = [];
  movies_want_behaviour = new BehaviorSubject([]);
  
  // variables for movies already watched
  movies_watched: any[] = [];
  movies_watched_behaviour = new BehaviorSubject([]);

  // variables for stars and reviews
  stars: string;
  review: string;
  stars_behaviour = new BehaviorSubject(null);
  review_behaviour = new BehaviorSubject(null);

  // variables for color of icons
  showDiary: boolean;
  showDiary_behaviour = new BehaviorSubject(null);

  constructor(private apiService: ApiService) { 
    this.loadMoviesToWatch();
    this.loadMoviesWatched();
  }

  isMovieInWatchlist(id: string): boolean{
    for (var i in this.movies_want){      
      if (this.movies_want[i].id == id){
        return true;
      }
    }
    return false;
  }

  isMovieInDiary(id: string): boolean{
    for (var i in this.movies_watched){
      if (this.movies_watched[i].id == id){
        return true;
      }
    }
    return false;
  }

  async saveToWatchlist(id: string){
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);


    var tmpIsMovieInWatchlist = false;

    for (var i in data[0].movies_want){
      if (id == data[0].movies_want[i]){
        tmpIsMovieInWatchlist = true;
      }
    }

    if (tmpIsMovieInWatchlist == false){
      data[0].movies_want.push(id);
    
      await Storage.set({
        key: 'user',
        value: JSON.stringify(data),
      });
    }

    this.loadMoviesToWatch();
  }

  async deleteToWatchlist(id: string){
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);

    // deleting the item from the array
    data[0].movies_want.forEach((element, index)=>{
      if(element==id) data[0].movies_want.splice(index,1);
    });
  
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data),
    });

    this.loadMoviesToWatch();
  }

  async deleteFromDiary(id: string){
    console.log(id);
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);

    // deleting the item from the array
    data[0].movies_watched.forEach((element, index)=>{
      if(element[0]==id) data[0].movies_watched.splice(index,1);
    });
  
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data),
    });

    this.loadMoviesWatched();
  }


  ////Observable part of the service////

  // Functions for a watch list
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

        if (this.information.release_date == undefined){
          tmpMovie.year = "n/a";
        }
        else {
          tmpMovie.year = this.information.release_date.substr(0, 4);
        }
        
        tmpMovie.image = 'https://image.tmdb.org/t/p/w500' 
          + this.information.poster_path;
      });
      this.movies_want.push(tmpMovie);
    }

    this.movies_want_behaviour.next(this.movies_want);
  }

  // functions for a watched list
  getMoviesWatched(): Observable<any> {
    return this.movies_watched_behaviour.asObservable();
  }

  async loadMoviesWatched(){
    // getting movies user wants to watch from storage
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    const movies_watched_int = data[0].movies_watched;

    this.movies_watched = [];

    for (var i in movies_watched_int){
      let tmpMovie = {} as Movie;
      // getting the stars
      tmpMovie.stars = movies_watched_int[i][1];

      // retrieving information about the movies
      // here is pipe for unsubscribing after
      this.apiService.getDetails(movies_watched_int[i][0]).pipe(first()).subscribe(result =>{
        this.information = result;
        tmpMovie.id = this.information.id;
        tmpMovie.name = this.information.original_title;

        if (this.information.release_date == undefined){
          tmpMovie.year = "n/a";
        }
        else {
          tmpMovie.year = this.information.release_date.substr(0, 4);
        }

        tmpMovie.image = 'https://image.tmdb.org/t/p/w500' 
          + this.information.poster_path;
      });
      this.movies_watched.push(tmpMovie);
    }
    this.movies_watched_behaviour.next(this.movies_watched);
  }

  // functions for stars and reviews
  getStars(): Observable<string>{
    return this.stars_behaviour.asObservable();
  }
  loadStars(stars: string){
    this.stars = stars;
    this.stars_behaviour.next(this.stars);
  }
  getReview(): Observable<string>{
    return this.review_behaviour.asObservable();
  }
  loadReview(review: string){
    this.review = review;
    this.review_behaviour.next(this.review);
  }

  // functions for color of the icons
  getColorDiary(): Observable<string>{
    return this.showDiary_behaviour.asObservable();
  }

  loadColors(id: string){

    if (this.isMovieInDiary(id)){
      this.showDiary = true;
    } else {
      this.showDiary = false;
    }
    this.showDiary_behaviour.next(this.showDiary);
  }
}
