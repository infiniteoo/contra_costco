// search-bar.component.ts

import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',

  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  standalone: true,
})
export class SearchBarComponent implements OnChanges {
  filter: string = '';

  @Output() search = new EventEmitter<string>();
  @Input() products: any;
  @Output() filteredProductsChange = new EventEmitter<any[]>();
  @Output() filteredProducts: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  private searchTerms = new Subject<string>();
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  // Implement autocomplete suggestions using Observables
  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          this.searchService.searchProducts(term, this.products)
        )
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  onFilterChange(filter: string) {
    // Emit the filter value to the parent component
    this.filterChange.emit(filter);
  }

  ngOnChanges() {}

  onSearchChange(): void {
    const filteredResults = this.searchService.searchProducts(
      this.searchQuery,
      this.products
    );
    this.filteredProducts = filteredResults;
    this.filteredProductsChange.emit(this.filteredProducts);

    console.log('onSearchChange called');
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange();
  }

  selectResult(product: any): void {
    this.searchQuery = product.name;
    this.onSearchChange();
  }

  filterProducts(query: string): void {
    // Filter products based on the query
    const filteredProducts = this.products.filter((product: any) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );

    // Emit the filtered products to the parent component
    this.filterChange.emit(filteredProducts);
  }
}
