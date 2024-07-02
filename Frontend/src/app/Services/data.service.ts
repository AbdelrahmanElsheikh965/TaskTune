import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  // private cartElements = new BehaviorSubject<Array<Product>>([]);

  getData(){
    // No need for asObservable() as get() returns observable by default.
    // this.http.get('http://localhost:3000/todos?limit=10&skip=0&status=to-do').subscribe(console.log);
    return this.http.get('http://localhost:3000/todos?limit=10&skip=0&status=to-do');
  }

  getServerSentEvent(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        this.ngZone.run(() => {
          const parsedData = JSON.parse(event.data)          
          observer.next(parsedData);
        });
      };

      eventSource.onerror = (error) => {
        this.ngZone.run(() => {
          observer.error(error);
        });
      };
      
      return () => eventSource.close();
    });
  }


}
