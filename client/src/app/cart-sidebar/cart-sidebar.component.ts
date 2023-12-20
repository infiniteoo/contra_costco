import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  @Input() isCartOpen: boolean = false;

  @Output() closeCartEvent: EventEmitter<void> = new EventEmitter<void>();

  toggleCart() {
    this.closeCartEvent.emit(); // Emit the event
  }
}
