import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // url of the database and api key 
  url = 'https://api.themoviedb.org/';
  apiKey = 'ed352757441aff22077d23aafb3f7928';


  constructor(private http: HttpClient) { }

  // function for searching for movies
  searchData(title: string): Observable<any>{
    return this.http
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${title}`);
  }

  getDetails(id){
    return this.http
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
  }
}
