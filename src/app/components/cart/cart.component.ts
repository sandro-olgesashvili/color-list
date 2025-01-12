import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.cartService.getCartProduct().subscribe((cart) => {
        this.productList = cart;
        this.productListCopy = cart;
      });
    }
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
    this.cartService.deleteFromCart(e.id).subscribe((x) => {
      this.productList = this.productList.filter(
        (product) => product.id !== e.id
      );
      this.productListCopy = this.productListCopy.filter(
        (product) => product.id !== e.id
      );
    });
  }

  increase(e: Product) {
    e.quantity! += 1;
    this.cartService.updateProduct(e).subscribe((x) => {});
  }

  decrease(e: Product) {
    if (e.quantity! > 1) {
      e.quantity! -= 1;
      this.cartService.updateProduct(e).subscribe((x) => {});
    }
  }
}
