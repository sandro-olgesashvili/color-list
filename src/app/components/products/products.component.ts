import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/products.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { map, mergeMap, Observable, retry, switchMap } from 'rxjs';

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

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.productsService
        .getProducts()
        .pipe(
          mergeMap((allProducts) => {
            return this.productsService
              .newProductsList()
              .pipe(map((newProducts) => [...allProducts, ...newProducts]));
          }),
          retry(2)
        )
        .subscribe((items) => {
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
    let user = localStorage.getItem('user')!;
    const { id, ...newObj } = e;

    if (user) {
      this.cartService
        .getCartProduct()
        .pipe(
          switchMap((prod) => {
            let itemExists = prod.filter((x) => x.product_id === e.id);
            if (itemExists.length) {
              alert('Item is already added!');
              return new Observable<Product[]>();
            } else {
              return this.productsService.addProduct({
                ...newObj,
                product_id: id,
                user: user,
                quantity: 1,
              });
            }
          })
        )
        .subscribe(() => {
          alert('Product added');
        });
    } else {
      alert('Login');
    }
  }
}
