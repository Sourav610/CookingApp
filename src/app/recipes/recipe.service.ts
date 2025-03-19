import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient-model";

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', "This is simply a test", "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille-recipe.jpg",
        [new Ingredient('potato',1),
        new Ingredient('French Fries',20)
        ]),
        new Recipe('Another chocolate recipe', "simple potato onion recipe"
        , "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille-recipe.jpg",
        [new Ingredient('Buns',2),
        new Ingredient('tomato',1)])
    ];

    getRecipe(){
        return this.recipes.slice(); //it will give a copy of the recipe
    }
}