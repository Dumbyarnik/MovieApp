import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  // for getting information from api
  moviesObservable: Observable<any>;
  // for showing them on html page
  moviesArray: any[] = [];
  // for giving the search string
  searchTerm = '';

  constructor(private apiService: ApiService) {}

  searchChanged(){
    // getting Observable object from query
    this.moviesObservable = this.apiService.searchData(this.searchTerm);
    
    // putting data into array
    this.moviesObservable.subscribe(res =>{
      this.moviesArray = res.results;
    });

  }

}
