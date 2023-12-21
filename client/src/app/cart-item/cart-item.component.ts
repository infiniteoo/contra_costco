import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  standalone: true,
})
export class CartItemComponent {
  @Input() item: any;
  @Output() removeItemEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  removeItem() {
    // Emit an event to notify the parent component to remove this item from the cart
    this.removeItemEvent.emit();
  }
}
