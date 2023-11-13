import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  console.warn(localStorage.getItem('id'));
  if (localStorage.getItem('id') !== null) {
    return true;
  } else {
    router.navigate(['/mainhome']);
    return false;
  }
};
