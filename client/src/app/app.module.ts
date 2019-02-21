import { FeathersService } from './services/feathers.service';
// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { LoginModule } from './login/login.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
// services
import { reducers, metaReducers } from './reducers';
import { AuthEffects } from './login/store/auth.effects';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ApiService } from './services/api.service';
import { MovementsComponent } from './movements/movements.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MovementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    LoginModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FeathersService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
