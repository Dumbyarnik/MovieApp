import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';


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

  // example of the button
  openWebsite(){
    window.open(this.information.homepage, '_blank');
  }

}
