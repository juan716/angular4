import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserService } from '../core/services/user.service';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    PanelModule,
    CardModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    UserService
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
