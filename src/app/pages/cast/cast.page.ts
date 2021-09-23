import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/services/api/api.service';
import { Actor } from '../movies-details/movies-details.page';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.page.html',
  styleUrls: ['./cast.page.scss'],
})
export class CastPage implements OnInit {

  // movie id
  id: string;

  // for getting information from api
  castObservable = null;
  // for showing them on html page
  cast: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private apiService: ApiService) { }

  ngOnInit() {
    // getting the information about the movie
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // getting cast information 
    this.apiService.getCast(this.id).subscribe(result =>{
      this.castObservable = result;
      for (var i in this.castObservable.cast){
        let tmpActor = {} as Actor;
        tmpActor.character = this.castObservable.cast[i].character;
        tmpActor.name = this.castObservable.cast[i].name;
        if (this.castObservable.cast[i].profile_path == undefined){
          tmpActor.profile_path = "https://akns-images.eonline.com/eol_images/" + 
          "Entire_Site/20171115/rs_634x822-171215083457-634.matt-damon" + 
          ".121517.jpg?fit=inside%7C900:auto&output-quality=90";
        } else {
          tmpActor.profile_path = "https://image.tmdb.org/t/p/h632" + 
          this.castObservable.cast[i].profile_path;
        }
        this.cast.push(tmpActor);
        
      }
    });
  }

}
