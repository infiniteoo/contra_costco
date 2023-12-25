import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})
export class ProductRatingComponent {
  @Input() rating: string = '';

  constructor() {}

  ngOnInit(): void {}

  // convert rating to number
  getRating(): number {
    return parseFloat(this.rating);
  }

  // get star rating
  getStarRating(): string {
    let itemRating = this.getRating();
    let starRating = '';

    for (let i = 1; i < itemRating; i++) {
      starRating += '★';
    }
    // add partial stars
    if (itemRating % 1 !== 0) {
      starRating += '½';
    }

    /*  // add empty stars
    for (let i = 0; i < 5 - itemRating; i++) {
      starRating += '☆';
    } */

    return starRating;
  }

  // get rating color
  getRatingColor(): string {
    let itemRating = this.getRating();
    if (itemRating >= 4) {
      return 'green';
    } else if (itemRating >= 3) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  // get rating text
  getRatingText(): string {
    let itemRating = this.getRating();
    if (itemRating >= 4) {
      return 'Excellent';
    } else if (itemRating >= 3) {
      return 'Good';
    } else {
      return 'Poor';
    }
  }
}
