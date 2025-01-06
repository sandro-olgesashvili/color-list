import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/products.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  productListCopy: Product[] = [];
  searchTerm: string = '';

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.productsService.getProducts().subscribe((items) => {
        this.productList = items;
        this.productListCopy = items;
      });
    });
  }

  filteredProducts(): void {
    this.productList = [...this.productListCopy];
    this.productList = this.productList.filter(
      (x) =>
        x.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        x.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addProductToCart(e: Product) {
    let storageItem = JSON.parse(localStorage.getItem('products')!);
    if (storageItem) {
      let exists = storageItem.some((x: Product) => x.id === e.id);
      if (exists) {
        alert('Item is already added!');
        return;
      }
      let arr = [{ ...e, quantity: 1 }, ...storageItem];
      localStorage.setItem('products', JSON.stringify(arr));
    } else {
      localStorage.setItem('products', JSON.stringify([{ ...e, quantity: 1 }]));
    }
  }
}
