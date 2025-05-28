import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RouterAppComponent } from "./app.route";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";


@NgModule({
    declarations:[AppComponent,HeaderComponent
    ],
    imports:[BrowserModule,
        RouterAppComponent,
        ReactiveFormsModule,
        RecipesModule,
        ShoppingListModule,
        SharedModule,
        AuthModule,
        CoreModule,
    FormsModule,HttpClientModule],
    // providers:[],
    bootstrap:[AppComponent]
})
export class AppModule{

}