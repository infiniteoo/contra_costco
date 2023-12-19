import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    ToolbarComponent,
    ProductDisplayComponent,
    MatToolbarModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';

  @Output() products: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // query the server for the products
    this.http.get('http://localhost:5000/api/products').subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}
