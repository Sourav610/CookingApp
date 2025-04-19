import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone:false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes!: Recipe[];
  constructor(private recipeService: RecipeService,private router:Router,
    private route:ActivatedRoute){

  }
    
  ngOnInit(): void {
    this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) =>{
      this.recipes = recipes;
    });
   this.recipes = this.recipeService.getRecipe();
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
