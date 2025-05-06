import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponse{
    token:string;
}
@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http: HttpClient){}

    signup(email:string, password: string){
        return this.http.post<AuthResponse>('',
        {
            email:email,
            password:password
        });
    }
}