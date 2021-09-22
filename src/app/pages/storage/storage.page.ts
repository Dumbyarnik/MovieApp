import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
})
export class StoragePage implements OnInit {

  constructor(private moviesService: MoviesService) {}

  ngOnInit(){

  }

  async setStorage(){
    const user = JSON.stringify([{
      name: 'user',
      password: 'user',
      movies_want: ['12', '13'],
      movies_watched: [['120', '4', 'Cool Movie']]

    }])

    await Storage.set({
      key: 'user',
      value: user
    })

    this.moviesService.loadMoviesWatched();
    this.moviesService.loadMoviesToWatch();
  }

  async showStorage(){
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    console.log('data: ', data[0]);

    this.moviesService.loadMoviesToWatch();
    this.moviesService.loadMoviesWatched();
  }

  async clearStorage(){
    await Storage.clear();

    //this.moviesService.loadMoviesToWatch();
  }

}
