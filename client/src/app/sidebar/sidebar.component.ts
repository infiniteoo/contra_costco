import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../../../chunk.pipe';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, ChunkPipe, FormsModule],
})
export class SidebarComponent {
  @Input() products: any[] = [];
  @Output() filteredProductsChange: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();
  selectedRating: number | null = null;
  selectedTag: string | null = null;

  minPrice: number = 0;
  maxPrice: number = 100;

  constructor(private searchService: SearchService) {}

  removeDuplicates(productTags: string[]): string[] {
    return Array.from(new Set(productTags));
  }

  chunkTags(tags: string[], chunkSize: number): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < tags.length; i += chunkSize) {
      result.push(tags.slice(i, i + chunkSize));
    }
    return result;
  }

  updatePriceRange(event: Event) {
    // Get the values from the input elements
    const minValue = Number((event.target as HTMLInputElement).value);
    const maxValue = Number(this.maxPrice);

    // Update minPrice and maxPrice
    this.minPrice = minValue;
    this.maxPrice = maxValue;

    // Filter by price range
    /*  filteredProducts = filteredProducts.filter((product) => {
      return product.price >= this.minPrice && product.price <= this.maxPrice;
    }); */

    this.applyFilters();
  }

  filterByRating(rating: number | null) {
    this.selectedRating = rating;
    console.log('this.selectedRating in filterByRating: ', this.selectedRating);
    this.applyFilters();
  }

  clearTags() {
    this.selectedTag = null;
    this.applyFilters();
  }

  filterByTag(tag: string | null) {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
    } else {
      this.selectedTag = tag;
      console.log('this.selected tag in filterby tag: ', this.selectedTag);
    }
    this.applyFilters();
  }

  private applyFilters() {
    let filteredProducts = this.products;

    // Filter by rating only if a rating is selected
    if (this.selectedRating !== null) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.productRating >= (this.selectedRating || 0);
      });

      console.log('filteredProducts in applyFilters(): ', filteredProducts);
    }

    // Filter by selected tag
    if (this.selectedTag !== null) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.productTags.includes(this.selectedTag);
      });
    }
    console.log('filteredProducts in applyFilters(): ', filteredProducts);

    // Emit filtered products to the parent component
    this.filteredProductsChange.emit(filteredProducts);
  }
}
