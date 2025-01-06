import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then((c) => c.CartComponent),
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
