import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../../../chunk.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, ChunkPipe, FormsModule],
})
export class SidebarComponent {
  @Input() products: any[] = [];
  minPrice: number = 0;
  maxPrice: number = 100; // Replace with your actual maximum price

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
  }

  filterByRating(rating: number) {}
}
