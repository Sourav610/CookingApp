 import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  // loadedFeature = 'recipe';
  // onNavigate(feature:string){
  //   this.loadedFeature = feature;
  // }
}
