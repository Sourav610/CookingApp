import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { RouterAppComponent } from "./app.route";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "./shopping-list/Store/shopping-list.reducer";



@NgModule({
    declarations:[AppComponent,HeaderComponent
    ],
    imports:[BrowserModule,
        RouterAppComponent,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        StoreModule.forRoot({ shoppingList: shoppingListReducer } as any),
        FormsModule,
        HttpClientModule
    ],
    // providers:[LoggingService],
    bootstrap:[AppComponent]
})
export class AppModule{

}