import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Storage } from '@capacitor/storage';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  // movie id
  id: string;

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
    private moviesService: MoviesService,
    private route: Router,
    public actionSheetController: ActionSheetController) { 
    }

  async ngOnInit() {

    // getting the information about the movie
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getDetails(this.id).subscribe(result =>{
      this.information = result;
    });

    // checking if the movie in the watchlist
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    const movies_want_int = data[0].movies_want;

    for (var i in movies_want_int){
      if (movies_want_int[i] == this.id){
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
      else{
        this.deleteToWatchlist();
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

  async deleteToWatchlist(){
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);

    // deleting the item from the array
    data[0].movies_want.forEach((element, index)=>{
      if(element==this.id) data[0].movies_want.splice(index,1);
    });
  
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

  async presentActionSheet(){

    // 2 variables for understanding which action sheet to open
    const isInWatchlist = this.moviesService.isMovieInWatchlist(this.id);
    const isInDiary = this.moviesService.isMovieInDiary(this.id);
    console.log('watchlist', isInWatchlist);
    console.log('diary', isInDiary);


    if (isInWatchlist && !isInDiary){
      const actionSheet = await this.actionSheetController.create({

        header: 'what to do',
        buttons: [
          {
            text: 'Move Out of Watchlist',
            icon: 'eye',
            handler: () => {
              console.log('first clicked');
            }
          },
          {
            text: 'Move To Diary',
            icon: 'heart',
            handler: () => {
              console.log('second clicked');
            }
          }, 
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              console.log('first clicked');
            }
          },
          {
            text: 'Edit',
            icon: 'heart',
            handler: () => {
              console.log('second clicked');
            }
          }, 
          {
            text: 'Move Out Of Diary',
            icon: 'trash',
            role: 'destructive',
            handler: () => {
              console.log('second clicked');
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              console.log('first clicked');
            }
          },
          {
            text: 'Move In Diary',
            icon: 'heart',
            handler: () => {
              console.log('second clicked');
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move Out Of Watchlist',
            icon: 'eye',
            handler: () => {
              console.log('first clicked');
            }
          },
          {
            text: 'Edit',
            icon: 'heart',
            handler: () => {
              console.log('second clicked');
            }
          },
          {
            text: 'Move Out of Diary',
            icon: 'heart',
            handler: () => {
              console.log('second clicked');
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
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
