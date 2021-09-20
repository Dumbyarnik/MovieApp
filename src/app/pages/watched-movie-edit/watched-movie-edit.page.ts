import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Storage } from '@capacitor/storage';
import {Location} from '@angular/common';

@Component({
  selector: 'app-watched-movie-edit',
  templateUrl: './watched-movie-edit.page.html',
  styleUrls: ['./watched-movie-edit.page.scss'],
})
export class WatchedMovieEditPage implements OnInit {
  // movie id
  id: string;
  // how many stars movie have
  stars: string = '1';
  // review of the user
  review: any;
  // if the movie is already in diary
  private isMovieInDiary: boolean = false;
  // position of movie in JSON array in Storage
  private moviePositionStorage: string = '-1';

  // variable to store info about the movie
  information = null;

  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService,
    private moviesService: MoviesService,
    public actionSheetController: ActionSheetController,
    private location: Location) { }

  async ngOnInit() {
    // getting the information about the movie
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getDetails(this.id).subscribe(result =>{
      this.information = result;
    });

    // checking if the movie is in diary
    // and therefore setting stars and review
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);

    for (var i in data[0].movies_watched){
      if (data[0].movies_watched[i][0] == this.id){
        this.isMovieInDiary = true;
        this.review = data[0].movies_watched[i][2];
        this.stars = data[0].movies_watched[i][1];
        this.moviePositionStorage = i;
      }
    }
  }

  change(event: any){
    this.stars = event.detail.value;
  }

  async submit(){
    // data drom storage
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);

    if (this.review == undefined){
      this.review = '';
    }

    if (this.isMovieInDiary){
      data[0].movies_watched[this.moviePositionStorage][1] = this.stars;
      data[0].movies_watched[this.moviePositionStorage][1] = this.review;
    }
    else {       
      data[0].movies_watched.push([this.information.id,
      this.stars, this.review]);

      // deleting the item from watchlist
      data[0].movies_want.forEach((element, index)=>{
        if(element==this.id) data[0].movies_want.splice(index,1);
      });
    }

    await Storage.set({
      key: 'user',
      value: JSON.stringify(data),
    });

    this.moviesService.loadMoviesToWatch();
    this.moviesService.loadMoviesWatched();

    // going back to previous page
    this.location.back();

    
  }

}
