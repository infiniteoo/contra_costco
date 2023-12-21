import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  @Input() isCartOpen: boolean = false;

  @Output() closeCartEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cartService: CartService) {}
  ngOnit() {
    this.getItemsInCart();
  }

  getItemsInCart() {
    console.log('items in cart: ', this.cartService.getItemsInCart());
    return this.cartService.getItemsInCart();
  }

  toggleCart() {
    this.closeCartEvent.emit(); // Emit the event
  }
}
