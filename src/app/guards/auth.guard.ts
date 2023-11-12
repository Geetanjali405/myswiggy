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
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, redirect to login page
    router.navigate(['/cart']);
    return false;
  }
};
