import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
// import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../loggin.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListAction from './Store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  standalone:false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients!: Observable<{ingredients:Ingredient[]}>;
  // private igChangeSub!: Subscription;

  constructor(
    // private shoppingList:ShoppingListService,
     private loggingService:LoggingService,
     private store:Store<fromApp.AppState>
     ){}

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredients= this.store.select('shoppingList');
    // this.ingredients = this.shoppingList.getIngredients();
    // this.igChangeSub = this.shoppingList.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
    //   this.ingredients = ingredients;
    // })
    this.loggingService.printLog('Hello from shopping list component ngOnInit')
  }

  onEditItem(index: number){
    // this.shoppingList.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }

}
