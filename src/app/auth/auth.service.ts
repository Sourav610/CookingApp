import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

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
    constructor(private http: HttpClient){}

    signup(email:string, password: string){
        return this.http.post<AuthResponse>('http://localhost:8080/createUser',
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

    private handleAuthentication(email:string, token:string,expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email,token,expirationDate);
        this.user.next(user);
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