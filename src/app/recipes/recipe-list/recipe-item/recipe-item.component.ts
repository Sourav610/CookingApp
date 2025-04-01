import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  standalone:false,
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Input() index!:number;
  // @Output() selectedRecipe= new EventEmitter<void>();

  // constructor(private recipeService: RecipeService){}
  // onSelectRecipe(){
  //   // this.selectedRecipe.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
  
}
