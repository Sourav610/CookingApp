import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RouterAppComponent } from "./app.route";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/Loading-spinner/Loading-spineer.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { RecipesModule } from "./recipes/recipes.module";


@NgModule({
    declarations:[AppComponent,HeaderComponent,ShoppingListComponent,
    ShoppingEditComponent,DropdownDirective
    ,AuthComponent,LoadingSpinnerComponent,
    AlertComponent,PlaceholderDirective],
    imports:[BrowserModule,CommonModule,
        RouterAppComponent,
        ReactiveFormsModule,
        RecipesModule,
    FormsModule,HttpClientModule],
    providers:[ShoppingListService,RecipeService,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
    bootstrap:[AppComponent]
})
export class AppModule{

}