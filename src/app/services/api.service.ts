import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  baseUrl = "https://hn.algolia.com/";
  getStories(tag:string = ''){
    return this.http.get(this.baseUrl + '/api/v1/search_by_date?tags=' + tag);
  }

}
