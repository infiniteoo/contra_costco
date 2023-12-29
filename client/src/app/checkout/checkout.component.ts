import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class CheckoutModalComponent {
  billingName: string = '';
  shippingName: string = '';

  @Output() closeCheckoutModal: EventEmitter<void> = new EventEmitter<void>();

  submitOrder() {
    // Process the order and submit it to the server
    // You can also add validation and further order processing logic here

    // Close the modal after submission
    this.closeCheckoutModal.emit();
  }

  closeModal() {
    this.closeCheckoutModal.emit();
  }
}
