import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getCartProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.cartProductsUrl}?user=${localStorage.getItem('user')}`
    );
  }

  deleteFromCart(id: number) {
    return this.http.delete(`${this.cartProductsUrl}/${id}`);
  }

  updateProduct(value: Product) {
    return this.http.put(`${this.cartProductsUrl}/${value.id}`, value);
  }
}
