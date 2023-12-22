import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  standalone: true,
  imports: [MatIconModule],
})
export class CartItemComponent {
  @Input() item: any;
  @Output() removeItemEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() totalQuantity: number; // Add total quantity input

  constructor() {
    this.totalQuantity = 0; // Initialize total quantity to 0
  }

  removeItem() {
    // Emit an event to notify the parent component to remove this item from the cart
    this.removeItemEvent.emit();
  }
}
