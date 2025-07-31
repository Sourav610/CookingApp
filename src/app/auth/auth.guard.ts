import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs";

import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,private router:Router
        ,private store:Store<fromApp.AppState>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState =>{
                return authState.user;
            }),
            map(user =>{
                    const isAuth= !!user; //it convert null or undefine to false
                    if(isAuth){
                        return true;
                    }
                    return this.router.createUrlTree(['/auth']);
                })
        );
        // return this.authService.user.pipe(take(1),map(user =>{
        //     const isAuth= !!user; //it convert null or undefine to false
        //     if(isAuth){
        //         return true;
        //     }
        //     return this.router.createUrlTree(['/auth']);
        // }),
        //  tap(isAuth =>{
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // })
        // );
    }
    
}