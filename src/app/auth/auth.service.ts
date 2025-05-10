import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthResponse{
    code:string;
    message:string;
    status:string;
    token:string;
}
@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http: HttpClient){}

    signup(email:string, password: string){
        return this.http.post<AuthResponse>('http://localhost:8080/createUser',
        {
            email:email,
            password:password
        }
        ).pipe(catchError(this.handleError));
    }

    login(email:string, password:string){
        return this.http.post<AuthResponse>('',
        {
            email:email,
            password:password
        }).pipe(catchError(this.handleError));;
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