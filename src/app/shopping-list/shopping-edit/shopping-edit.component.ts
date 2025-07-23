import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient-model';
// import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../Store/shopping-list.action';
import * as fromShoppingList from '../Store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  standalone:false,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput')nameInputRef!:ElementRef;
  // @ViewChild('amountInput')amountInputRef!:ElementRef;

  @ViewChild('f') slForm!:NgForm;
  subscription!: Subscription;
  editMode=false;
  
  editedItem!: Ingredient;

  constructor(
    // private slService:ShoppingListService,
    private store:Store<fromShoppingList.AppState>
  ){}

  ngOnInit(): void {
   this.subscription = this.store.select('shoppingList').subscribe(stateData =>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      } else{
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index:number)=>{
    //     this.editItemIndex= index;
    //     this.editMode=true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name:this.editedItem.name,
    //       amount:this.editedItem.amount
    //     })
    //   }
    // );
  }
  
  
  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName,ingAmount);
    // this.slService.addIngredient(newIngredient);
    const value=form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      // this.slService.updateIngredient(this.editItemIndex,newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    }
    else{
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient)); 
    }
    this.editMode=false;
    form.reset();
    
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
   }
}
