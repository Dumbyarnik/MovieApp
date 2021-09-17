import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSearchService } from '../services/movies-search/movie-search.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  results: Observable<any>;
  searchTerm = '';
  resultsArray: any[] = [];

  constructor(private movieSearchService: MovieSearchService) {}

  searchChanged(){
    // getting JSON object from query
    this.results = this.movieSearchService.searchData(this.searchTerm);
    
    // putting data into array
    this.results.subscribe(res =>{
      this.resultsArray = res.results;
      //console.log("resultsArray ", this.resultsArray)
    });

  }

}
