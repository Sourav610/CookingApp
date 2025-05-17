import { Component,EventEmitter,OnDestroy,OnInit,Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

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

    constructor(private dataStorageService:DataStorageService,
        private authService: AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user =>{
            this.isAuthenticated = !user?false:true;  //it same as this - !!user 
        });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}