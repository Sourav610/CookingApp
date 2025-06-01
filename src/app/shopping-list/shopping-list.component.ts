import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../loggin.service';

@Component({
  selector: 'app-shopping-list',
  standalone:false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients!:Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private shoppingList:ShoppingListService, private loggingService:LoggingService){}

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.igChangeSub = this.shoppingList.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    })
    this.loggingService.printLog('Hello from shopping list component ngOnInit')
  }

  onEditItem(index: number){
    this.shoppingList.startedEditing.next(index);
  }

}
