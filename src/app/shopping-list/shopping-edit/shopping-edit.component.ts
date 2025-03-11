import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient-model';

@Component({
  selector: 'app-shopping-edit',
  standalone:false,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput')nameInputRef!:ElementRef;
  @ViewChild('amountInput')amountInputRef!:ElementRef;
  @Output() IngredientAdded = new EventEmitter<Ingredient>();
  
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.IngredientAdded.emit(newIngredient);
  }
}
