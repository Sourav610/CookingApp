import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeEditComponent
    ],
    imports:[RouterModule,CommonModule,ReactiveFormsModule],
    exports:[
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeEditComponent
    ]
})
export class RecipesModule{}