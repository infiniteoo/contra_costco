import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    ProductModalComponent,
    ProductRatingComponent,
    ProductReviewsComponent,
  ],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
})
export class ProductDisplayComponent implements OnInit {
  @Input() products: any;
  @Output() isModalOpen: boolean = false;
  @Output() rating: string = '';
  @Output() reviews: [] = [];
  selectedProduct: any; // Track the selected product

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

  openModal(product: any) {
    this.selectedProduct = product; // Set the selected product
    console.log('openModal() called, value: ', this.isModalOpen);
    this.isModalOpen = true;
  }
}
