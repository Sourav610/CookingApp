import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { RecipesComponent } from "./recipes/recipes.component"
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes =[
    {path:'',redirectTo:'/recipes', pathMatch:'full'}, // pathMatch required because if empty path is present then for every path empty will be
    //present and it will give error.
    //below routes move to recipe route.
    // {path:'recipes',component:RecipesComponent,
    // canActivate: [AuthGuard],
    // children:[
    //     {path:'',component:RecipeStartComponent},
    //     {path:'new',component:RecipeEditComponent},
    //     {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
    //     {path:':id/edit',component:RecipeEditComponent}
    // ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path: 'auth',component:AuthComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class RouterAppComponent{
    
}