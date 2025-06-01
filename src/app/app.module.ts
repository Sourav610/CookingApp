import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./header/header.component";
import { RouterAppComponent } from "./app.route";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { LoggingService } from "./loggin.service";


@NgModule({
    declarations:[AppComponent,HeaderComponent
    ],
    imports:[BrowserModule,
        RouterAppComponent,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
    FormsModule,HttpClientModule],
    // providers:[LoggingService],
    bootstrap:[AppComponent]
})
export class AppModule{

}