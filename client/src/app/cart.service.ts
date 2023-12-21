// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsInCart: any[] = [];

  addItemToCart(product: any) {
    this.itemsInCart.push(product);
  }

  getItemsInCart() {
    return this.itemsInCart;
  }
}
