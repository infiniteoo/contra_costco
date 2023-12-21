import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent implements OnInit {
  @Input() products: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('ngOnInit called'); // Check if ngOnInit is called
    console.log('products:', this.products); // Check the value of 'products'

    if (this.products) {
      console.log('products inside product display: ', this.products);
    }
  }

  addItemToCart(product: any) {
    this.cartService.addItemToCart(product);
  }
}
