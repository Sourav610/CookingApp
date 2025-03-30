import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { RecipesComponent } from "./recipes/recipes.component"
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes =[
    {path:'',redirectTo:'/recipes', pathMatch:'full'}, // pathMatch required because if empty path is present then for every path empty will be
    //present and it will give error.
    {path:'recipes',component:RecipesComponent},
    {path:'shopping-list',component:ShoppingListComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class RouterAppComponent{
    
}