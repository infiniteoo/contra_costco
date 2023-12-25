import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ProductRatingComponent, ProductReviewsComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  constructor() {}
  @Input() product: any = null;
  @Input() isModalOpen: boolean = false;
  @Input() rating: string = '';
  @Input() reviews: [] = [];
  @Output() isModalOpenChange = new EventEmitter<boolean>();

  closeModal() {
    this.isModalOpen = false;
    this.isModalOpenChange.emit(this.isModalOpen); // Emit the value back to the parent
  }
}
