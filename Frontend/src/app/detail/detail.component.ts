import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../HelperInterfaces/Product';
import { DataService } from '../Services/data.service';

@Component({
    selector: 'app-detail',
    standalone: true,
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    imports: [HeaderComponent]
})
export class DetailComponent {
    
    
    productDetails !: Product;
    constructor(private acRoute: ActivatedRoute, private dataService: DataService){}

    productsData: any;

    ngOnInit(){
      const id = this.acRoute.snapshot.params['id'];
        this.dataService.getData().subscribe((data) => {
            this.productsData = data;
            this.productsData = this.productsData['products'];
            this.productDetails = this.productsData.find( (product: Product) => product.id == id )!;
          });
        
    }

}
