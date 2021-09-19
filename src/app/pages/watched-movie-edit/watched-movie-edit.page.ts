import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Storage } from '@capacitor/storage';

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
  isMovieInDiary: boolean;

  // variable to store info about the movie
  information = null;

  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService,
    private moviesService: MoviesService,
    private route: Router,
    public actionSheetController: ActionSheetController) { }

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
      }
    }
  }

  change(event: any){
    
  }

  submit(){
    
  }

}
