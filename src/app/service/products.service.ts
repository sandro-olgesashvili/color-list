import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = 'https://fakestoreapi.com/products';
  private productsUrlJson = 'http://localhost:3000/products';
  private newProductsUrl = 'http://localhost:3000/newProducts';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number | string | null): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  getProductAdded(id: number | string | null): Observable<Product> {
    return this.http.get<Product>(`${this.newProductsUrl}/${id}`);
  }

  addProduct(value: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrlJson, value);
  }

  newProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.newProductsUrl);
  }
}
