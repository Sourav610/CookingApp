import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Subscription, map } from 'rxjs';
import * as RecipesActions from '../store/recipe.action';

@Component({
  selector: 'app-recipe-edit',
  standalone:false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  id!:number;
  editMode=false;
  recipeForm!: FormGroup;

  private StoreSub!:Subscription;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>
    ){}
  ngOnDestroy(): void {
    if(this.StoreSub){
      this.StoreSub.unsubscribe();
    }
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.editMode=params['id'] != null; //checking if id is present or undefine if undefine editMOde will be false. 
        this.initForm();  
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<any>([]);

    if(this.editMode){
      // const recipe = this.recipeService.getRecipes(this.id);
      this.StoreSub = this.store.select('recipes').pipe(map(recipeState =>{
        return recipeState.recipes.find((recipe,index) =>{
          return index === this.id;
        });
      })).subscribe(recipe =>{
        recipeName = recipe!.name;
        recipeImagePath = recipe!.imagePath;
        recipeDescription = recipe!.description;
        if(recipe!['ingredients']){
          for(let ingredients of recipe!.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredients.name,Validators.required),
                'amount':new FormControl(ingredients.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })
      // recipeName = recipe.name;
      // recipeImagePath = recipe.imagePath;
      // recipeDescription = recipe.description;
      // if(recipe['ingredients']){
      //   for(let ingredients of recipe.ingredients){
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'name': new FormControl(ingredients.name,Validators.required),
      //         'amount':new FormControl(ingredients.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      //       })
      //     );
      //   }
      // }
    }
    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value('ingredients'));
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value)
      this.store.dispatch(new RecipesActions.UpdateRecipe({index:this.id,newRecipe:this.recipeForm.value}) )
    }
    else{
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
    }
    this.onCancel();
  }
  
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
