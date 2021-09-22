import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

export interface Actor{
  name: string;
  character: string;
  profile_path: string;
}

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  // movie id
  id: string;

  // variable to store info about the movie
  information = null;

  // variable to store info about casting 
  castObservable = null;
  cast: Actor[] = [];

  // variable to store info about similiar movies
  similiarMoviesObervable = null;
  similiarMovies: any[] = [];

  // variables for icon colors
  //showDiary
  showWatchlist: boolean;
  showDiary: boolean;

  // ActivatedRoute we need for retrieving id
  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService,
    private moviesService: MoviesService,
    private router: Router,
    public actionSheetController: ActionSheetController) { 
    }

  async ngOnInit() {

    // getting the information about the movie
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // getting details about the movie
    this.apiService.getDetails(this.id).subscribe(result =>{
      this.information = result;
      this.information.release_date = this.information.release_date.substr(0, 4);
    });
    // getting cast information 
    this.apiService.getCast(this.id).subscribe(result =>{
      this.castObservable = result;
      for (var i in this.castObservable.cast){
        let tmpActor = {} as Actor;
        tmpActor.character = this.castObservable.cast[i].character;
        tmpActor.name = this.castObservable.cast[i].name;
        tmpActor.profile_path = "https://image.tmdb.org/t/p/h632" + 
          this.castObservable.cast[i].profile_path;
        this.cast.push(tmpActor);
      }
    });
    // getting similiar movies
    this.similiarMoviesObervable = this.apiService.getSimiliarMovies(this.id);
    this.similiarMoviesObervable.subscribe(res =>{
      this.similiarMovies = res.results;
      for (var i in this.similiarMovies){
        if (this.similiarMovies[i].release_date == undefined){
          this.similiarMovies[i].release_date = "n/a"
        }
        else {
          this.similiarMovies[i].release_date = 
            this.similiarMovies[i].release_date.substr(0,4);
        }
      }
    });

    this.moviesService.loadMoviesToWatch();

    // setting colors
    this.showWatchlist = this.moviesService.isMovieInWatchlist(this.id);
    this.showDiary = this.moviesService.isMovieInDiary(this.id);
    console.log(this.showDiary);
  }

  // edit and move in diary buttons in actionsheet
  goToEdit(){
    this.router.navigate(['/search/edit/' + this.id]);
  }

  // button - open website
  openWebsite(){
    window.open(this.information.homepage, '_blank');
  }

  // button - ActionSheet
  async presentActionSheet(){

    // 2 variables for understanding which action sheet to open
    const isInWatchlist = this.moviesService.isMovieInWatchlist(this.id);
    const isInDiary = this.moviesService.isMovieInDiary(this.id);

    // 4 different conditions for actionSheet
    if (isInWatchlist && !isInDiary){
      const actionSheet = await this.actionSheetController.create({

        buttons: [
          {
            text: 'Move Out of Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.deleteToWatchlist(this.id);
              this.showWatchlist = false;
            }
          },
          {
            text: 'Move To Diary',
            icon: 'heart',
            handler: () => {
              this.goToEdit();
            }
          }, 
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ],
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        mode: 'ios'
      });

      await actionSheet.present();
    }
    else if (!isInWatchlist && isInDiary){
      const actionSheet = await this.actionSheetController.create({

        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.saveToWatchlist(this.id);
              this.showWatchlist = true;
            }
          },
          {
            text: 'Edit',
            icon: 'heart',
            handler: () => {
              this.goToEdit();
            }
          }, 
          {
            text: 'Move Out Of Diary',
            icon: 'trash',
            role: 'destructive',
            handler: () => {
              this.moviesService.deleteFromDiary(this.id);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ],
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        mode: 'ios'
      });

      await actionSheet.present();
    }
    else if (!isInWatchlist && !isInDiary){
      const actionSheet = await this.actionSheetController.create({

        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.saveToWatchlist(this.id);
              this.showWatchlist = true;
            }
          },
          {
            text: 'Move In Diary',
            icon: 'heart',
            handler: () => {
              this.goToEdit();
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ],
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        mode: 'ios'
      });

      await actionSheet.present();
    }
    else {
      const actionSheet = await this.actionSheetController.create({

        buttons: [
          {
            text: 'Move Out Of Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.deleteToWatchlist(this.id);
              this.showWatchlist = false;
            }
          },
          {
            text: 'Edit',
            icon: 'heart',
            handler: () => {
              this.goToEdit();
            }
          },
          {
            text: 'Move Out of Diary',
            icon: 'heart',
            handler: () => {
              this.moviesService.deleteFromDiary(this.id);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }
        ],
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        mode: 'ios'
      });

      await actionSheet.present();
    }
  }

}
