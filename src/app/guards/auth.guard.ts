import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

export const authGuard: CanActivateFn = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.getUser().pipe(
      map((user) => {
        if (localStorage.getItem('user')) {
          return true;
        }
        router.navigate(['/']);
        return false;
      })
    );
  };

