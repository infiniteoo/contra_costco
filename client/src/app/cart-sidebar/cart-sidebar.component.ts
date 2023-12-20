import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  @Input() isCartOpen: boolean = false;
  @Input() itemsInCart: any;
  @Output() closeCartEvent: EventEmitter<void> = new EventEmitter<void>();

  toggleCart() {
    this.closeCartEvent.emit(); // Emit the event
  }
}
