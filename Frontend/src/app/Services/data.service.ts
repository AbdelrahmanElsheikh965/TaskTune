import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // private cartElements = new BehaviorSubject<Array<Product>>([]);

  getData(){
    // No need for asObservable() as get() returns observable by default.
    return this.http.get('https://dummyjson.com/products/category/laptops');
  }


}
