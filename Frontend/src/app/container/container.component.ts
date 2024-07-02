import { Component, Output } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../Services/data.service';
import { Product } from '../../HelperInterfaces/Product';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [ListComponent, HeaderComponent]
})
export class ContainerComponent {

productsData: any[] = [];

constructor(private dataService: DataService){}

ngOnInit(){
    this.dataService.getServerSentEvent('http://localhost:3000/todos/all?limit=10&skip=0&status=to-do')
    .subscribe({
      next: (data) => {
        this.productsData.push(data)
      },
      error: (error) => console.error('SSE error:', error)
    });
  }

  // ngOnDestroy(): void {
  //   if (this.dataService) {
  //     this.dataService.unsubscribe();
  //   }
  // }
      
}
