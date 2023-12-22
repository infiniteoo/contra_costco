// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsInCart: any[] = [];
  totalItemsInCart: number = 0;

  addItemToCart(product: any) {
    this.itemsInCart.push(product);
    this.totalItemsInCart = this.itemsInCart.length;
  }

  getItemsInCart() {
    return this.itemsInCart;
  }
}
