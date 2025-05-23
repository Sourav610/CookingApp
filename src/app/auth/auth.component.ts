import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponse, AuthService } from "./auth.service";
import { Observable, Subscribable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    standalone:false
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading= false;
    error: null | string = "";
    @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective | undefined;
    private closeSub!: Subscription; 

    constructor(private authService: AuthService,private router:Router,
        private componentFactoryResolver:ComponentFactoryResolver){}
    

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        // console.log(form.value);
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponse>
        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.login(email,password)
        }
        else{
            authObs = this.authService.signup(email,password)
        }

        authObs.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading=false;
                this.router.navigate(['/recipes'])
            },
            errorMessage =>{
                console.log(errorMessage);
                this.showErrorAlert(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    private showErrorAlert(message:string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost?.viewContainerRef;
        hostViewContainerRef?.clear();

        const componentRef = hostViewContainerRef?.createComponent(alertCmpFactory);

        componentRef!.instance.message = message;
        this.closeSub = componentRef?.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe();
            hostViewContainerRef?.clear();
        });
    }


    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe()
        }
    }
}