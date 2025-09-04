import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { RouterAppComponent } from "./app.route";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { StoreModule } from "@ngrx/store";
import * as fromApp from './store/app.reducer';
import { AuthEffect } from "./auth/store/auth.effect";
import { environment } from "../environments/environment";
import { RecipeEffects } from "./recipes/store/recipe.effect";

@NgModule({
    declarations:[AppComponent,HeaderComponent
    ],
    imports:[BrowserModule,
        RouterAppComponent,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        StoreModule.forRoot(fromApp.appReducer),
         EffectsModule.forRoot([AuthEffect,RecipeEffects]),
         StoreDevtoolsModule.instrument({
            logOnly:environment.production
         }),
         StoreRouterConnectingModule.forRoot(),
        FormsModule,
        HttpClientModule
    ],
    // providers:[LoggingService],
    bootstrap:[AppComponent]
})
export class AppModule{

}