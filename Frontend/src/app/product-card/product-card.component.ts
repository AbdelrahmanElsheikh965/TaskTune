import { Component, Input } from '@angular/core';
import { Product } from '../../HelperInterfaces/Product';
import { ProductDiscountPipe } from '../Pipes/product-discount.pipe';
import { DatePipe } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../Services/data.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ProductDiscountPipe, DatePipe, RatingModule, FormsModule, ListComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  private eventSource!: EventSource;
  constructor(private dataService: DataService, private routeObj : Router, private cartService: CartService){}

  @Input() product!: Product;
  productsData: any;

  ngOnInit() {
    // this.eventSource = this.dataService.getDataSSE();    
    // this.eventSource.onmessage = (event) => {       
    //     this.productsData = JSON.parse(event.data);
    // };
  }
 
  view(id: number){
    this.routeObj.navigate(['details', id])
  }
  
  getExactProduct(productId: number){
    return this.productsData.find( (product: Product) => product.id == productId );
  }
  
  addProduct(newproductId: number){

    var addedProduct = this.getExactProduct(newproductId)!;
    
    addedProduct.quantity = 1;

    this.cartService.addProduct(addedProduct);   // ! non-null assertion operator.

    // for debugging
    this.cartService
      .getProducts()
      .subscribe(data => console.log(data));
      
  }
}
