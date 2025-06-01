 import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './loggin.service';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private loggingService:LoggingService){}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello From AppComponent ngOnInit')
  }
  // loadedFeature = 'recipe';
  // onNavigate(feature:string){
  //   this.loadedFeature = feature;
  // }
}
