import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone:false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes!: Recipe[];
  subscription!:Subscription;
  constructor(private recipeService: RecipeService,private router:Router,
    private route:ActivatedRoute){

  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
    
  ngOnInit(): void {
   this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) =>{
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
