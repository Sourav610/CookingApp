import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponse, AuthService } from "./auth.service";
import { Observable, Subscribable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    standalone: false
})
export class AuthComponent implements OnDestroy, OnInit {
    isLoginMode = true;
    isLoading = false;
    error: null | string = "";
    @ViewChild(PlaceholderDirective, { static: false })
    alertHost!: PlaceholderDirective;

    private closeSub!: Subscription;
    private storeSub!:Subscription;

    constructor(
        // private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>) { }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe()
        }
        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            // if (authState.user) {
            //     this.router.navigate();
            // }
            if (this.error) {
                this.showErrorAlert(this.error)
            }
        })
    }


    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        // console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        // let authObs: Observable<AuthResponse>
        this.isLoading = true;
        if (this.isLoginMode) {
            // authObs = this.authService.login(email,password)
            this.store.dispatch(new AuthActions.LoginStart({
                email: email,
                password: password
            }));
        }
        else {
            // authObs = this.authService.signup(email, password)
            this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }))
        }


        //     authObs.subscribe(
        //         resData =>{
        //             console.log(resData);
        //             this.isLoading=false;
        //             this.router.navigate(['/recipes'])
        //         },
        //         errorMessage =>{
        //             console.log(errorMessage);
        //             this.showErrorAlert(errorMessage);
        //             this.error = errorMessage;
        //             this.isLoading = false;
        //         }
        //     );
        form.reset();
    }

        onHandleError(){
            this.store.dispatch(new AuthActions.ClearError());
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
}