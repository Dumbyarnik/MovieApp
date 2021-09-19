import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Storage } from '@capacitor/storage';
import { MoviesService } from 'src/app/services/movies/movies.service';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  // for checking if the movie in the watchlist
  movies_want: any[] = [];  

  // variable to store info about the movie
  information = null;
  // for WatchList Toggle
  isWatchlistToggled: boolean;
  // to resolve the problem when movie is already on the watchList,
  // then do not trigger saveToWatchList() function
  isWatchlistToggledFirstTime: boolean = false;

  // ActivatedRoute we need for retrieving id
  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService,
    private moviesService: MoviesService) { 
    
    }

  async ngOnInit() {
    // getting the information about the movie
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getDetails(id).subscribe(result =>{
      this.information = result;
    });

    // checking if the movie in the watchlist
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    const movies_want_int = data[0].movies_want;
    this.isWatchlistToggled = false;
    for (var i in movies_want_int){
      if (movies_want_int[i] == id){
        this.isWatchlistToggled = true;
        this.isWatchlistToggledFirstTime = true;
      }
    }
    
  }

  // toggle - save to watchlist
  notifyWatchlistToggle(){
    if (this.isWatchlistToggledFirstTime){
      this.isWatchlistToggledFirstTime = false;
    }
    else {
      if (this.isWatchlistToggled == true){
        this.saveToWatchlist();
      }
    }
    
  }
  
  
  async saveToWatchlist(){
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);
    data[0].movies_want.push(this.information.id);
    
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data),
    });

    this.moviesService.loadMoviesToWatch();
  }



  // button - open website
  openWebsite(){
    window.open(this.information.homepage, '_blank');
  }


}
