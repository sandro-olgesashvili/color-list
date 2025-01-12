import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  productUrl = 'http://localhost:3000/newProducts';

  constructor(private http: HttpClient) {}

  addProduct(value: Product) {
    return this.http.post(this.productUrl, value);
  }

  removeProduct(id: number | string) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
