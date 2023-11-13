import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  console.log('hi');
  console.error(localStorage.getItem('user'));
  console.warn(localStorage.getItem('id'));
  if (localStorage.getItem('user') !== null) {
    router.navigate['dashboard']
    // alert('access denied true');
    return true;
  } else {
    // alert('access denied false');
    return false;
  }
};
