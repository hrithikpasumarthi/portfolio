import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  canActivate(): boolean  {
      if(localStorage.getItem("isloggedin")=="true")
      {
        return true;
      }
      else{
        this.router.navigate(["/login"]);
        return false;
      }
  }
  constructor(private router:Router) { }
}
