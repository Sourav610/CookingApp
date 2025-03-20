import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient-model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
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

    constructor(private slService:ShoppingListService){}
    getRecipe(){
        return this.recipes.slice(); //it will give a copy of the recipe
    }

    addIngredientToShoppingList(ingredient:Ingredient[]){
        this.slService.addIngredients(ingredient);
    }
}