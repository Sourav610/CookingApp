import { Action } from "@ngrx/store";
import * as ShoppingListActions from './shopping-list.action';
import { Ingredient } from "../../shared/ingredient-model";
import { NonNullAssert } from "@angular/compiler";


export interface State {
    ingredients:Ingredient[];
    editedIngredient:Ingredient|null;
    editedIngredientIndex:number;
}

// export interface AppState{
//     shoppingList:State;
// }

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
};

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients:updateIngredients,
                editedIngredientIndex:-1,
                editedIngredient:null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return{
                ...state,
                ingredients: state.ingredients.filter((ig,igIndex) => {
                    return igIndex != state.editedIngredientIndex;
                })
            } 
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1
            }; 
        default:
            return state;
 }
}