import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RouterAppComponent } from "./app.route";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations:[AppComponent,HeaderComponent,RecipesComponent,
    RecipeDetailComponent,RecipeItemComponent,RecipeListComponent,ShoppingListComponent,
    ShoppingEditComponent,DropdownDirective,RecipeEditComponent],
    imports:[BrowserModule,CommonModule,
        RouterAppComponent,
        ReactiveFormsModule,
    FormsModule],
    providers:[ShoppingListService],
    bootstrap:[AppComponent]
})
export class AppModule{

}