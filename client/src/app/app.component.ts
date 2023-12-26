// app.component.ts

import {
  Component,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { CartService } from './cart.service';

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
export class AppComponent implements OnChanges {
  title = 'client';
  @Input() isCartOpen: boolean = false;
  @Output() products: any[] = [];
  filteredProducts: any[] = [];

  isButtonActive: boolean = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.isButtonActive = !this.isButtonActive;
  }

  closeCart() {
    this.isCartOpen = false;
    this.isButtonActive = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['filteredProducts'] &&
      changes['filteredProducts'].currentValue
    ) {
      console.log(
        'filteredProducts changed:',
        changes['filteredProducts'].currentValue
      );
      this.filteredProducts = changes['filteredProducts'].currentValue;
    }
  }

  constructor(private http: HttpClient, private cartService: CartService) {}

  toggleButton() {
    this.isButtonActive = !this.isButtonActive;
  }
  ngOnInit() {
    // query the server for the products
    this.http
      .get('http://localhost:5000/api/products')
      .subscribe((data: any) => {
        this.products = data;
      });

    // Check local storage for cart
    const cartData = localStorage.getItem('cart');

    if (cartData !== null) {
      this.cartService.itemsInCart = JSON.parse(cartData);
      this.cartService.totalItemsInCart = this.cartService.itemsInCart.length;
    }
  }

  totalItemsInCart() {
    return this.cartService.totalItemsInCart;
  }

  onFilteredProductsChange(filteredProducts: any[]): void {
    this.filteredProducts = filteredProducts;
    console.log('Filtered products updated:', this.filteredProducts);
  }
}
