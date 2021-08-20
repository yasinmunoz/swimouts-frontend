import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path : '', redirectTo: 'login', pathMatch: 'full'
  } , {
    path : 'profile',
    component: UserProfileComponent
  } , {
     path : 'login',
    component: SigninComponent
  }  , {
    path : 'register',
    component: SignupComponent
  } 
 
];

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxIntlTelInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    UserProfileComponent
  ]
})
export class AuthModule { }
