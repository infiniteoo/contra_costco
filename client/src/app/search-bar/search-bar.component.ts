import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';

  onSearchChange(): void {
    this.search.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange();
  }
}
