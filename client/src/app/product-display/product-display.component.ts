// product-display.component.ts

import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class ProductDisplayComponent implements OnChanges {
  @Input() products: any[] = [];
  @Output() isModalOpen: boolean = false;
  @Output() rating: string = '';
  @Output() reviews: [] = [];
  @Input() filteredProducts: any[] = [];
  selectedProduct: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (this.products) {
    }
  }

  addItemToCart(product: any) {
    this.cartService.addItemToCart(product);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(
      'in product display ng on changes filtered products: ',
      this.filteredProducts
    );
  }

  openModal(product: any) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  preventModalOpen(event: Event): void {
    event.stopPropagation();
  }
}
