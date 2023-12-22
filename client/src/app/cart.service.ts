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
    // write to local storage
    localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  }

  getItemsInCart() {
    return this.itemsInCart;
  }

  removeItemFromCart(item: any) {
    const index = this.itemsInCart.indexOf(item);
    this.itemsInCart.splice(index, 1);
    this.totalItemsInCart = this.itemsInCart.length;
    localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  }
}
