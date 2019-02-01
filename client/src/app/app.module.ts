// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { LoginModule } from './login/login.module';
// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
// services
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { WarehouseService } from './services/warehouse.service';
import { AssigneesService } from './services/assignees.service';
import { AuthService } from './services/auth/auth.service';
import { TokenInterceptor } from './services/auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    LoginModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    WarehouseService,
    AssigneesService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
