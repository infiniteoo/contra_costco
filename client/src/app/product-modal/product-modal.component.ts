import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    ProductRatingComponent,
    ProductReviewsComponent,
    CommonModule,
    ImageModalComponent,
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  constructor() {}
  @Input() product: any = null;
  @Input() isModalOpen: boolean = false;
  @Output() isImageModalOpen: boolean = false;
  @Input() rating: string = '';
  @Input() reviews: [] = [];
  @Output() isModalOpenChange = new EventEmitter<boolean>();
  @Output() isImageModalOpenChange = new EventEmitter<boolean>();

  closeModal() {
    this.isModalOpen = false;
    this.isModalOpenChange.emit(this.isModalOpen); // Emit the value back to the parent
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.isImageModalOpenChange.emit(this.isImageModalOpen); // Emit the value back to the parent
  }

  openImageModal() {
    this.isImageModalOpen = true;
    this.isImageModalOpenChange.emit(this.isImageModalOpen); // Emit the value to control the image modal
    console.log('openImageModal', this.isImageModalOpen);
  }
}
