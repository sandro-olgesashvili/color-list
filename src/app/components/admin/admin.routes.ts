import { Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../admin/admin.component').then((c) => c.AdminComponent),
    pathMatch: 'full',
  },
  {
    path: 'manage-products',
    loadComponent: () =>
      import('./manage-products/manage-products.component').then(
        (c) => c.ManageProductsComponent
      ),
  },
];
