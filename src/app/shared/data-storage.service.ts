import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
        private recipeService:RecipeService,
        private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
        this.http.post('http://localhost:8080/saveRecipes',recipes)
        .subscribe(response=>{
            console.log(response);
        });
    }

     fetchRecipes(){
        return this.http.get<Recipe[]>(
             'http://localhost:8080/fetchRecipes'
        )
        .pipe(
        map(recipes =>{
            return recipes.map(recipes => {
                return {
                    ...recipes,
                    ingredinets:recipes.ingredients?recipes.ingredients:[]
                }
            });
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes);
        }));
        // return this.http.get<Recipe[]>('http://localhost:8080/fetchRecipes')
        // .pipe(map(response => {
        //     return response.map(response =>{
        //         return {...response, ingredients: response.ingredients? response.ingredients:[]}
        //     })
        // }),
        // tap(response =>{
        //     this.recipeService.setRecipes(response);
        // })
        // );
    }
}