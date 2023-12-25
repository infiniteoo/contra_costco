import { Component, Input } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent {
  @Input() reviews: any[] = [];
  fakeReviews: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Generate fake reviews for demonstration purposes
    console.log(this.reviews);
    this.generateFakeReviews();
  }

  generateFakeReviews() {
    // Generate an array of fake reviews with random data
    for (let i = 0; i < 3; i++) {
      console.log(this.reviews[i]);
      const fakeReview = {
        profilePicture: faker.image.avatar(),
        profileName: faker.internet.userName(),
        comment: this.reviews[i], // You can customize the text
      };
      this.fakeReviews.push(fakeReview);
    }

    console.log(this.fakeReviews);

    // Merge fake reviews with real reviews
    this.reviews = this.reviews.concat(this.fakeReviews);
  }
}
