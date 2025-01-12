import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from '../../models/products.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';

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
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.activatedRoute.paramMap
        .pipe(
          switchMap((params) =>
            this.productsService.getProduct(params.get('id')).pipe(
              switchMap((prod) => {
                if (prod?.id) {
                  return of(prod);
                } else {
                  return this.productsService.getProductAdded(params.get('id'));
                }
              })
            )
          )
        )
        .subscribe((item) => {
          this.product = item;
          console.log(item);
        });
    });
  }

  goBack() {
    this.router.navigate(['']);
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
              return new Observable();
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
