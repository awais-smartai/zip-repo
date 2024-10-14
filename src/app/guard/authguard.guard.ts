import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const role = localStorage.getItem('role'); // Retrieve the role from local storage
    console.log('=====>',role)
    if (role === 'admin') {
      return true; // Allow access to the route for admin
    } else {
      // Redirect to another route (e.g., home page) for non-admin users
      return this.router.createUrlTree(['/user-profile']);
    }
  }
}
