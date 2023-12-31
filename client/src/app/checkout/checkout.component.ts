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
  billingAddress: string = '';
  shippingAddress: string = '';
  billingCity: string = '';
  shippingCity: string = '';
  billingState: string = '';
  shippingState: string = '';
  billingZip: string = '';
  shippingZip: string = '';
  billingCountry: string = '';
  shippingCountry: string = '';
  billingPhone: string = '';
  shippingPhone: string = '';
  billingEmail: string = '';
  shippingEmail: string = '';
  billingCardName: string = '';
  billingCardNumber: string = '';
  billingCardExpiration: string = '';
  billingCardCVV: string = '';
  expirationDate: string = '';
  cardNumber: string = '';
  sameShippingBilling: boolean = false;
  billingFirstName: string = '';
  billingLastName: string = '';
  shippingFirstName: string = '';
  shippingLastName: string = '';
  cvv: string = '';

  @Output() closeCheckoutModal: EventEmitter<void> = new EventEmitter<void>();

  combineShippingAndBilling() {
    // Combine the shipping and billing address if the user selects the checkbox
    this.sameShippingBilling = !this.sameShippingBilling;
    if (this.sameShippingBilling) {
      this.shippingFirstName = this.billingFirstName;
      this.shippingLastName = this.billingLastName;
      this.shippingAddress = this.billingAddress;
      this.shippingCity = this.billingCity;
      this.shippingState = this.billingState;
      this.shippingZip = this.billingZip;
      this.shippingCountry = this.billingCountry;
      this.shippingPhone = this.billingPhone;
      this.shippingEmail = this.billingEmail;
    } else {
      this.shippingFirstName = '';
      this.shippingLastName = '';
      this.shippingAddress = '';
      this.shippingCity = '';
      this.shippingState = '';
      this.shippingZip = '';
      this.shippingCountry = '';
      this.shippingPhone = '';
      this.shippingEmail = '';
    }
  }

  calculateGrandTotal() {
    // Calculate the grand total of the order
    // You can also add tax and shipping charges here
    /*  const cartItems = this.getItemsInCartWithQuantity();
    let grandTotal = 0;

    for (const item of cartItems) {
      grandTotal += item.totalQuantity * item.price;
    }

    return grandTotal; */
  }

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
