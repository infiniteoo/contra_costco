import { Component, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';

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
    CartSidebarComponent,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  @Input() isCartOpen: boolean = false;
  @Output() products: any;
  @Output() itemsInCart = [];

  isButtonActive: boolean = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    console.log('isCartOpen? in app.comp', this.isCartOpen);
    this.isButtonActive = !this.isButtonActive;
  }

  closeCart() {
    this.isCartOpen = false; // Close the sidebar
    this.isButtonActive = false;
  }

  constructor(private http: HttpClient) {
    this.itemsInCart = [];
  }

  toggleButton() {
    this.isButtonActive = !this.isButtonActive;
  }
  ngOnInit() {
    // query the server for the products
    this.http.get('http://localhost:5000/api/products').subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}
