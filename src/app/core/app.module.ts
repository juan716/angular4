import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from '../core/app.component';

import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './../user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './utils/interceptors/auth-interceptor';
import { Common } from './utils/common';
import { DashboardModule } from './../dashboard/dashboard.module';


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './../user/user.module#UserModule',
  } ,
   {
    path: 'dashboard',
    loadChildren: './../dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    RouterModule.forChild(appRoutes),
    HttpClientModule,
    DashboardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    deps: [Injector],
  },
  Common],
  bootstrap: [AppComponent]
})
export class AppModule { }
