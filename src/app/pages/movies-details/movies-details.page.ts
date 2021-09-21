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

  // variable to store info about the movie
  information = null;

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
  }
  
  // edit and move in diary buttons in actionsheet
  goToEdit(){
    this.route.navigate(['/tabs/tab2/edit/' + this.id]);
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move Out of Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.deleteToWatchlist(this.id);
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.saveToWatchlist(this.id);
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move In Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.saveToWatchlist(this.id);
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

        header: 'what to do',
        buttons: [
          {
            text: 'Move Out Of Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.deleteToWatchlist(this.id);
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
