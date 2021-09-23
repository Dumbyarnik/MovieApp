import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // for getting information from api
  moviesObservable: Observable<any>;
  // for showing them on html page
  moviesArray: any[] = [];
  // for giving the search string
  searchTerm: string = '';
  // for page number
  page: number = 1;
  // for how many pages there at all
  total_pages: number;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.searchChanged();
  }

  // when search is changed, we have to load new data
  searchChanged(){
    this.page = 1;

    // getting Observable object from query
    if (!this.searchTerm){
      this.moviesObservable = this.apiService.getPopular(this.page);
    }
    else {
      this.moviesObservable = this.apiService.searchData(this.searchTerm, this.page);
    }
    
    // putting data into array
    this.moviesObservable.subscribe(res =>{
      this.moviesArray = res.results;
      this.total_pages = res.total_pages;
      for (var i in this.moviesArray){
        // checking the poster information
        if (this.moviesArray[i].poster_path == undefined){
          this.moviesArray[i].poster_path = "https://img.fruugo.com/product/8/89/14259898_max.jpg";
        } else {
          this.moviesArray[i].poster_path = "https://image.tmdb.org/t/p/w500" + 
          this.moviesArray[i].poster_path;
        }

        // checking the release date information
        if (this.moviesArray[i].release_date == undefined){
          this.moviesArray[i].release_date = "n/a"
        }
        else {
          this.moviesArray[i].release_date = 
            this.moviesArray[i].release_date.substr(0,4);
        }
      }
    });
  }

  // adding data when scroll is down
  addData(){
    this.page++;

    // getting Observable object from query
    if (!this.searchTerm){
      this.moviesObservable = this.apiService.getPopular(this.page);
    }
    else {
      this.moviesObservable = this.apiService.searchData(this.searchTerm, this.page);
    }
    
    var tmpArray = [];

    // putting data into array
    this.moviesObservable.subscribe(res =>{
      tmpArray = res.results;

      for (var i in tmpArray){

        // checking the poster information
        if (tmpArray[i].poster_path == undefined){
          console.log(tmpArray[i].poster_path);
          tmpArray[i].poster_path = "https://img.fruugo.com/product/8/89/14259898_max.jpg";
        } else {
          tmpArray[i].poster_path = "https://image.tmdb.org/t/p/w500" + 
            tmpArray[i].poster_path;
        }

        // checking the release date information
        if (tmpArray[i].release_date == undefined){
          tmpArray[i].release_date = "n/a"
        }
        else {
          tmpArray[i].release_date = 
            tmpArray[i].release_date.substr(0,4);
        }

        this.moviesArray.push(tmpArray[i]);
      }

      
    });
  }

  // Infinite Scropp code
  loadData(event) {
    setTimeout(() => {
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
