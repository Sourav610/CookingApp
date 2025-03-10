import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone:false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', "This is simply a test", "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille-recipe.jpg"),
    new Recipe('Another chocolate recipe', "simple potato onion recipe", "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille-recipe.jpg")
  ];

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
