import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let user = localStorage.getItem('user');
  if (user === 'admin') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
