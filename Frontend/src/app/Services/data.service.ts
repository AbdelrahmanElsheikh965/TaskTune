import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  getData(){
    return this.http.get('http://localhost:3000/todos?limit=10&skip=0&status=to-do');
  }

  // getDataSSE(){
  //   const es = new EventSource('http://localhost:3000/todos/all?limit=10&skip=0&status=to-do');
  //   return es;
  // }

  getDataSSE(): Observable<any> {
    return new Observable(observer => {
      const es = new EventSource('http://localhost:3000/todos/all?limit=10&skip=0&status=to-do');
      
      es.onmessage = event => {
        observer.next(JSON.parse(event.data));
      };

      es.onerror = error => {
        observer.error(error);
      };

      return () => {
        es.close(); // Ensure SSE connection is closed when unsubscribed
      };
    });
  }

}
