import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
// import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LoggingService } from "./loggin.service";

@NgModule({
    providers:[
        // ShoppingListService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass:AuthInterceptorService,
            multi:true
        },
        // LoggingService - // for eagerly loaded
    ]
})
export class CoreModule{}