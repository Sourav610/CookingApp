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


@NgModule({
    declarations:[AppComponent,HeaderComponent,RecipesComponent,
    RecipeDetailComponent,RecipeItemComponent,RecipeListComponent,ShoppingListComponent,ShoppingEditComponent],
    imports:[BrowserModule],
    bootstrap:[AppComponent]
})
export class AppModule{

}