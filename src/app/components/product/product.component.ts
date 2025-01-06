import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { switchMap } from 'rxjs';
import { Product } from '../../models/products.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  product!: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.activatedRoute.paramMap
        .pipe(
          switchMap((params) =>
            this.productsService.getProduct(params.get('id'))
          )
        )
        .subscribe((item) => (this.product = item));
    });
  }

  goBack() {
    this.router.navigate(['']);
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
