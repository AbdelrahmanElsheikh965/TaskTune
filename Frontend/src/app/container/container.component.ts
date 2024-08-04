import { Component, Output } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../Services/data.service';
import { Product } from '../../HelperInterfaces/Product';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [ListComponent, HeaderComponent]
})
export class ContainerComponent {

productsData: any;
private eventSource!: EventSource;
private eventSourceSubscription!: Subscription;

constructor(private dataService: DataService){}

ngOnInit(){

  this.eventSourceSubscription = this.dataService.getDataSSE().subscribe({
      next: data => {
        this.productsData = data;
        console.log("Data:", this.productsData);
      },
      error: err => {
        console.error('SSE Error:', err);
      }
    });    
  }

  ngOnDestroy(): void {
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
  }
      
}
