// search.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchProducts(query: string, products: any[]): any[] {
    if (!query || !products || products.length === 0) {
      return [];
    }

    query = query.toLowerCase();

    // Use the filter method to search within product properties
    const filteredProducts = products.filter((product) => {
      const productName = product.productName.toLowerCase();
      const productDescription = product.productDescription.toLowerCase();
      const productTags = product.productTags.map((tag: string) =>
        tag.toLowerCase()
      );
      const productCategories = product.productCategories.map(
        (category: string) => category.toLowerCase()
      );

      // Check if the query matches any of the product properties
      if (
        productName.includes(query) ||
        productDescription.includes(query) ||
        productTags.some((tag: string) => tag.includes(query)) ||
        productCategories.some((category: string) => category.includes(query))
      ) {
        return true;
      }

      return false;
    });

    return filteredProducts;
  }
}
