import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../HelperInterfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  public cartElements = new BehaviorSubject<Array<Product>>([]);

  getProducts(){
    return this.cartElements.asObservable();
  }

  addProduct(product: Product){
    // no array.push() so we use concat() instead
    this.cartElements.next(this.cartElements.getValue().concat(product));
  }
  
}
