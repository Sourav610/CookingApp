import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone:false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id!:number;
  editMode=false;

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.editMode=params['id'] != null; //checking if id is present or undefine if undefine editMOde will be false.   
      }
    )
  }


}
