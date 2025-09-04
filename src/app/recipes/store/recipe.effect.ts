import { Actions, ofType, createEffect } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs';
import {Recipe} from '../recipe.model';

import * as RecipesActions from './recipe.action';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects{
    fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(()=>{
            return this.http.get<Recipe[]>(
                'http://localhost:8080/fetchRecipes'
            )
        }),
        map(recipes =>{
                return recipes.map(recipes => {
                    return {
                        ...recipes,
                        ingredinets:recipes.ingredients?recipes.ingredients:[]
                    }
                });
            }),
            map(recipes =>{
                return new RecipesActions.SetRecipes(recipes)
            })
        )
    );

    storeRecipes = createEffect(() =>
        this.actions$.pipe(ofType(RecipesActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')), // let use to merge previous observer value to current observer.
            switchMap(([actionData,recipesState]) => {
                return this.http.post('http://localhost:8080/saveRecipes', recipesState.recipes)
                })
            ),
            {dispatch:false}
    );
    
    constructor(private actions$:Actions,
        private http:HttpClient,
        private store:Store<fromApp.AppState>){}
}