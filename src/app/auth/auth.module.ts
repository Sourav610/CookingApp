import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./store/auth.reducer";


@NgModule({
declarations:[AuthComponent],
imports:[
    CommonModule,
    FormsModule,RouterModule.forChild([{path: '',component:AuthComponent}]),
    SharedModule,
    StoreModule.forFeature('auth', authReducer)]
},)
export class AuthModule{} 