import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as fromApp  from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as RecipesActions from '../store/recipe.action';
import * as ShoppingListActions from '../../shopping-list/Store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  standalone:false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe!:Recipe;
  recipe:Recipe|any;
  id!:number;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>
    ){}

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params:Params) =>{
    //     this.id = +params['id'];
    //     // this.recipe = this.recipeService.getRecipes(this.id);
    //     this.store.select('recipes').pipe(map(recipeState =>{
    //       return recipeState.recipes.find((recipe,index) =>{
    //         return index == this.id;
    //       });
    //     })
    //     )
    //     .subscribe(recipe =>{
    //       this.recipe = recipe;
    //     })
    //   }
    // )

    //creating one big observable
    this.route.params.pipe(map(params =>{
      return +params['id'];
    }),switchMap(id =>{
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipeState =>{
      return recipeState.recipes.find((recipe,index) =>{
        return index === this.id;
      });
    })
    )
    .subscribe(recipe =>{
      this.recipe = recipe;
    });
  }


  onAddToShoppingList(){
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredient(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
