import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
 
export class AdminGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         
       let pass = prompt('Please enter admin password','admin');
       if(pass == 'admin'){
           return true
       }
       else return false;
    }
}