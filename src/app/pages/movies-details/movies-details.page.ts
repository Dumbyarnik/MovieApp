import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  // variable to store info about the movie
  information = null;

  // ActivatedRoute we need for retrieving id
  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getDetails(id).subscribe(result =>{
      this.information = result;
    });
  }

  // button - open website
  openWebsite(){
    window.open(this.information.homepage, '_blank');
  }

  // button - save to watchlist
  async saveToWatch(){
    var user = await Storage.get({ key: 'user'});
    var data = JSON.parse(user.value);
    data[0].movies_want.push(this.information.id);
    
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data),
    });
  }

}
