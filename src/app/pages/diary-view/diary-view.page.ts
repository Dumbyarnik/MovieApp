import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Storage } from '@capacitor/storage';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-diary-view',
  templateUrl: './diary-view.page.html',
  styleUrls: ['./diary-view.page.scss'],
})
export class DiaryViewPage implements OnInit {

  // movie id
  id: string;

  stars: string;
  review:string = '';

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
      if (this.information.poster_path == undefined){
        this.information.poster_path = "https://img.fruugo.com/product/8/89/14259898_max.jpg";
      } else {
        this.information.poster_path = "https://image.tmdb.org/t/p/w500" + 
          this.information.poster_path;
      }
    });

    

    // checking if the movie is in diary
    // and therefore setting stars and review
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);

    for (var i in data[0].movies_watched){
      if (data[0].movies_watched[i][0] == this.id){
        this.review = data[0].movies_watched[i][2];
        this.stars = data[0].movies_watched[i][1];
      }
    }

    // subscribing to stars and review
    this.moviesService.loadStars(this.stars);
    this.moviesService.getStars().subscribe(res =>{
      this.stars = res;
    });
    this.moviesService.loadReview(this.review);
    this.moviesService.getReview().subscribe(res =>{
      this.review = res;
    });
  }

  // edit button in action sheet
  goToEdit(){
    this.route.navigate(['/lists/diary/edit/' + this.id]);
  }

  // open movie page button
  openMovieDetails(){
    this.route.navigate(['/search/' + this.id]);
  }

  // share button
  async shareMovie(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    var imageUrl = image.webPath;

    await Share.share({
      title: 'Movie: ' + this.information.title,
      text: 'The movie: ' + this.information.title + 
      'Review: "' + this.review + '", Stars: ' + this.stars +
      '. Check out new movie app!',
      url: image.path,
      dialogTitle: 'Share with friends',
    });
  }

  // button - ActionSheet
  async presentActionSheet(){

    // to understand if movie in watchlist
    const isInWatchlist = this.moviesService.isMovieInWatchlist(this.id);

    // 4 different conditions for actionSheet
    if (isInWatchlist){
      const actionSheet = await this.actionSheetController.create({

        header: 'what to do',
        buttons: [
          {
            text: 'Share',
            icon: 'share',
            handler: () => {
              this.shareMovie();
            }
          },
          {
            text: 'Delete from Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.deleteToWatchlist(this.id);
            }
          },
          {
            text: 'Edit',
            icon: 'folder-open',
            handler: () => {
              this.goToEdit();
            }
          }, 
          {
            text: 'Delete from Watched',
            icon: 'folder-open',
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
            text: 'Share',
            icon: 'share',
            handler: () => {
              this.shareMovie();
            }
          },
          {
            text: 'Save in Watchlist',
            icon: 'eye',
            handler: () => {
              this.moviesService.saveToWatchlist(this.id);
            }
          },
          {
            text: 'Edit',
            icon: 'folder-open',
            handler: () => {
              this.goToEdit();
            }
          }, 
          {
            text: 'Save in Watched',
            icon: 'folder-open',
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
