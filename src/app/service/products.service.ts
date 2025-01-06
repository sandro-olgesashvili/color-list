import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number | string | null): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }
}
