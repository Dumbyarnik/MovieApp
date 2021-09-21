import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // for getting information from api
  moviesObservable: Observable<any>;
  // for showing them on html page
  moviesArray: any[] = [];
  // for giving the search string
  searchTerm = '';
  // for page number
  page: number = 1;
  // for how many pages there at all
  total_pages: number;

  constructor(private apiService: ApiService) {}

  // when search is changed, we have to load new data
  searchChanged(){
    // getting Observable object from query
    this.moviesObservable = this.apiService.searchData(this.searchTerm, this.page);
    
    // putting data into array
    this.moviesObservable.subscribe(res =>{
      this.moviesArray = res.results;
      this.total_pages = res.total_pages;
    });

    this.page = 1;

  }

  // adding data when scroll is down
  addData(){
    this.page++;

    // getting Observable object from query
    this.moviesObservable = this.apiService.searchData(this.searchTerm, this.page);
    
    var tmpArray = [];

    // putting data into array
    this.moviesObservable.subscribe(res =>{
      tmpArray = res.results;
    
      for (var i in tmpArray){
        this.moviesArray.push(tmpArray[i]);
      }
    });
  }

  // Infinite Scropp code
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.page == this.total_pages) {
        event.target.disabled = true;
      }
      else {
        this.addData();
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }



}
