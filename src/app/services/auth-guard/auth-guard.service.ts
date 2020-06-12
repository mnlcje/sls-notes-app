import { AuthService } from './../auth/auth.service';
    import { Injectable } from '@angular/core';
    import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
    
    @Injectable({providedIn: 'root'})
    export class AuthGuard implements CanActivate {
        
        constructor(
            private authService: AuthService,
            private router: Router
            
        ) { }
    
        async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            try{
                await this.authService.isLoggedIn();
                return true;
            }
            catch(err){
                this.router.navigate(['login']);
                return false;
            }
            
        }
    }
   

    