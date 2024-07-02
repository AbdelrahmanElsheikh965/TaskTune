import { Component, Output } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../Services/data.service';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.css',
    imports: [ListComponent, HeaderComponent]
})
export class ContainerComponent {

productsData: any;

constructor(private dataService: DataService){}

ngOnInit(){
    this.dataService.getData().subscribe((data) => {
      this.productsData = data;
      this.productsData = this.productsData['products'];
    });
  }
      
}
