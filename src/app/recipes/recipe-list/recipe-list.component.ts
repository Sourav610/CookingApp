import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipe.reducer';  // <- feature reducer
import * as RecipeActions from '../store/recipe.action';

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
  constructor(private router:Router,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>
    ){

  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
    
  ngOnInit(): void {
  //  this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) =>{
  //     this.recipes = recipes;
  //   });
  this.subscription = this.store.select('recipes')
  .pipe(map((recipesState: fromRecipes.State) => recipesState.recipes))
  .subscribe((recipes:Recipe[]) =>{
    this.recipes = recipes;
  })
  this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
