import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CheckoutModalComponent } from '../checkout/checkout.component';
@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, CartItemComponent, CheckoutModalComponent],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  @Input() isCartOpen: boolean = false;
  cartItems: any = [];

  @Output() closeCartEvent: EventEmitter<void> = new EventEmitter<void>(); // Rename this property

  isCheckoutModalOpen: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnit() {
    this.cartItems = this.getItemsInCart();
  }

  getItemsInCart() {
    console.log('items in cart: ', this.cartService.getItemsInCart());
    return this.cartService.getItemsInCart();
  }

  toggleCart() {
    this.closeCartEvent.emit(); // Emit the event
  }

  showCheckoutModal() {
    // Show the checkout modal
    this.isCartOpen = false;
    this.isCheckoutModalOpen = true;
  }

  getItemsInCartWithQuantity() {
    const cartItems = this.cartService.getItemsInCart();
    const itemsWithQuantity = [];

    // Create a Set to keep track of processed item IDs to avoid duplicate calculations
    const processedItemIds = new Set();

    for (const item of cartItems) {
      if (!processedItemIds.has(item.productName)) {
        const totalQuantity = cartItems.filter(
          (cartItem) => cartItem.productName === item.productName
        ).length;
        itemsWithQuantity.push({ ...item, totalQuantity });
        processedItemIds.add(item.productName);
      }
    }

    return itemsWithQuantity;
  }

  removeItem(itemToRemove: any) {
    this.cartService.removeItemFromCart(itemToRemove);
  }

  totalPriceForCart() {
    // calculate total price of all the items in shopping cart
    const cartItems = this.cartService.getItemsInCart();
    let totalPrice = 0;
    for (const item of cartItems) {
      // remove $ dollar sign from item.productPrice
      item.productPrice = item.productPrice.replace('$', '');
      totalPrice += parseFloat(item.productPrice);
    }
    return totalPrice;
  }
}
