import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { MoviesService } from '../services/movies/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private moviesService: MoviesService) {}

  ngOnInit(){

  }

  async setItem(){
    const user = JSON.stringify([{
      name: 'user',
      password: 'user',
      movies_want: [12, 13, 14]
    }])

    await Storage.set({
      key: 'user',
      value: user
    })

    this.moviesService.loadMoviesToWatch();
  }

  async showItem(){
    const user = await Storage.get({ key: 'user'});
    const data = JSON.parse(user.value);
    console.log('data: ', data[0].movies_want);

    this.moviesService.loadMoviesToWatch();
  }

  async clearStorage(){
    await Storage.clear();

    //this.moviesService.loadMoviesToWatch();
  }

}
