import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Product } from '../../HelperInterfaces/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private cartService: CartService){}

  myData!: Product[];

  ngOnInit(){
    this.cartService.getProducts().subscribe( (dataOfProducts) => this.myData = dataOfProducts );
  }
  
  getExactProduct(productId: number){
    return this.myData.find( (product: Product) => product.id == productId );
  }

  increaseQuantity(p_id: number){
    
    var addedProduct = this.getExactProduct(p_id)!;

    if((addedProduct.quantity + 1) <= addedProduct.stock){
      addedProduct.quantity++;
    }else{
      alert('Out Of Stock');
    }

  }

  decreaseQuantity(p_id: number){

    var addedProduct = this.getExactProduct(p_id)!;

    if((addedProduct.quantity - 1) >= 1){
      addedProduct.quantity--;
    }else{
      alert('Error');
    }

  }

  removeProduct(p_id: number){
      this.cartService.cartElements.next(this.cartService.cartElements.getValue().filter((product) => product.id != p_id));
    }

}
