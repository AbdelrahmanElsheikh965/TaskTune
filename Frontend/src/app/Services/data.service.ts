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
    this.http.get('http://localhost:3000/todos?limit=10&skip=0&status=to-do').subscribe(console.log);
    return this.http.get('http://localhost:3000/todos?limit=10&skip=0&status=to-do');
  }


}
