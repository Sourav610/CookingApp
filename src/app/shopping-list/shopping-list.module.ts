import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoggingService } from "../loggin.service";

@NgModule({
    declarations:[ShoppingListComponent,
        ShoppingEditComponent],
    imports:[RouterModule.forChild([
        {path:'',component:ShoppingListComponent},
    ]),FormsModule,SharedModule],
    // providers:[LoggingService] //for lazyLoading
})
export class ShoppingListModule{}