import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, SearchBarComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  // Constructor and other class members here

  performSearch(query: string): void {
    // Implement your search logic here
    console.log('Performing search with query:', query);
  }
}
