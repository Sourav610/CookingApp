import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";

import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService,
        private store:Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState =>{
                return authState.user;
            }),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const headers = new HttpHeaders().set('Authorization', `Bearer ${user!.token}`);
                const modifiedReq = req.clone({headers})
                return next.handle(modifiedReq);
            })
        )
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => {
        //         if(!user){
        //             return next.handle(req);
        //         }
        //         const headers = new HttpHeaders().set('Authorization', `Bearer ${user!.token}`);
        //         const modifiedReq = req.clone({headers})
        //         return next.handle(modifiedReq);
        //     })
        // );
       
    }

}