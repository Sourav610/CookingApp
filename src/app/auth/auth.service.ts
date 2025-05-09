import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponse{
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
        });
    }
}