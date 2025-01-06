import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productList: Product[] = [];
  productListCopy: Product[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.productList = JSON.parse(localStorage.getItem('products')!);
    this.productListCopy = JSON.parse(localStorage.getItem('products')!);
  }
  filteredProducts(): void {
    this.productList = [...this.productListCopy];
    this.productList = this.productList.filter(
      (x) =>
        x.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        x.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  removeProductFromCart(e: Product) {
    let storageItem = JSON.parse(localStorage.getItem('products')!);
    if (storageItem) {
      let arr = storageItem.filter((item: Product) => item.id !== e.id);
      this.productList = arr;
      this.productListCopy = arr;
      localStorage.setItem('products', JSON.stringify(arr));
    }
  }
}
