import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent {
  @Input() products: any;
  @Input() itemsInCart: any;

  constructor() {
    this.itemsInCart = [];
  }

  ngOnInit(): void {
    console.log('ngOnInit called'); // Check if ngOnInit is called
    console.log('products:', this.products); // Check the value of 'products'

    if (this.products) {
      console.log('products inside product display: ', this.products);
    }
  }

  addItemToCart(product: any) {
    console.log('product: ', product);
    this.itemsInCart?.push(product);
    console.log('itemsInCart: ', this.itemsInCart);
  }
}
