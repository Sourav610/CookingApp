import { Component,EventEmitter,OnDestroy,OnInit,Output } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action';
import * as RecipeActions from '../recipes/store/recipe.action';

@Component({
    selector:'app-header',
    standalone:false,
    templateUrl:"./header.component.html",
    styleUrl:"./header.component.css"
})
export class HeaderComponent implements OnInit,OnDestroy{
    private userSub!: Subscription;
    isAuthenticated = false;
    // @Output() element = new EventEmitter<string>();
    // onSelect(feature:string){
    //     this.element.emit(feature);
    // }

    constructor(
        private authService: AuthService,
        private store:Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
        .pipe(map(authState =>authState.user))
        .subscribe(user =>{
                this.isAuthenticated = !user?false:true;  //it same as this - !!user 
            });
        // this.userSub = this.authService.user.subscribe(user =>{
        //     this.isAuthenticated = !user?false:true;  //it same as this - !!user 
        // });
    }

    onSaveData(){
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData(){
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthAction.Logout());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}