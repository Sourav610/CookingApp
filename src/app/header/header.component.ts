import { Component,EventEmitter,Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    standalone:false,
    templateUrl:"./header.component.html",
    styleUrl:"./header.component.css"
})
export class HeaderComponent{
    // @Output() element = new EventEmitter<string>();
    // onSelect(feature:string){
    //     this.element.emit(feature);
    // }

    constructor(private dataStorageService:DataStorageService){}

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}