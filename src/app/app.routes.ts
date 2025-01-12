import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

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
    loadComponent: () =>
      import('./components/product/product.component').then(
        (c) => c.ProductComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then((c) => c.CartComponent),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.routes').then((c) => c.admin),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
