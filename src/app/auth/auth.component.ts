import { Component } from "@angular/core";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    standalone:false
})
export class AuthComponent{
    isLoginMode = true;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
}