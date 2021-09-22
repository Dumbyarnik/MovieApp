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
        tmpActor.profile_path = "https://image.tmdb.org/t/p/h632" + 
          this.castObservable.cast[i].profile_path;
        this.cast.push(tmpActor);
        
      }
      console.log(this.cast);
    });
  }

}
