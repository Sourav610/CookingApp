import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponse{
    code:string;
    message:string;
    status:string;
    token:string;
    expiresIn:string;
}
@Injectable({providedIn:'root'})
export class AuthService{
    // user = new Subject<User>();
    user = new BehaviorSubject<User|null>(null);
    private tokenExpirationTime:any;
    constructor(private http: HttpClient,private router:Router){}

    signup(email:string, password: string){
        return this.http.post<AuthResponse>(environment.createUserUrl,
        {
            email:email,
            password:password
        }
        ).pipe(catchError(this.handleError),tap(resData =>{
            this.handleAuthentication(email,resData.token,+resData.expiresIn);
        }));
    }

    login(email:string, password:string){
        return this.http.post<AuthResponse>('http://localhost:8080/login',
        {
            email:email,
            password:password
        }).pipe(catchError(this.handleError),tap(resData =>{
            console.log(resData);
            this.handleAuthentication(email,resData.token,+resData.expiresIn);
        }));;
    }

    autoLogin(){
        const userData:{
        email:string;
        _token:string;
        _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData')!);
        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email,userData._token,
            new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.autoLogout(expirationDuration)
        }

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTime){
            clearTimeout(this.tokenExpirationTime);
        }
        this.tokenExpirationTime = null;
    }

    autoLogout(expirationDuration:number){
        console.log(expirationDuration);
        this.tokenExpirationTime = setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }

    private handleAuthentication(email:string, token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage ='An unknown error occured! ';
        if(!errorRes.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email does not exits.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
    
}