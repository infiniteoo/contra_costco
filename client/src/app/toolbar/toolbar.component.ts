// toolbar.component.ts

import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, SearchBarComponent, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnChanges {
  @Input() products: any[] = [];
  filteredProducts: any[] = [];
  @Output() filteredProductsChange: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();

  performSearch(query: string): void {}

  ngOnChanges() {}

  onFilterChange(filter: string) {
    // Filter the products based on the input filter value
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(filter.toLowerCase())
    );

    // Emit the filtered products to the parent component
    this.filteredProductsChange.emit(this.filteredProducts);
  }
}
