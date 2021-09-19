import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-watched-movie-edit',
  templateUrl: './watched-movie-edit.page.html',
  styleUrls: ['./watched-movie-edit.page.scss'],
})
export class WatchedMovieEditPage implements OnInit {
  // movie id
  id: string;
  // stars
  stars: string = '2';

  // variable to store info about the movie
  information = null;

  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService,
    private moviesService: MoviesService,
    private route: Router,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    // getting the information about the movie
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getDetails(this.id).subscribe(result =>{
      this.information = result;
    });
  }

  change(event: any){
    console.log(event.detail.value);
  }

}
