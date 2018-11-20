import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardLayoutComponent } from './modules/dashboard/layouts/dashboard-layout.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './modules/core/guards';

const routes: Routes =[
  {
    path: '',
    component: HomeComponent
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: RegisterComponent
  }, 
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './modules/dashboard/dashboard-layout.module#DashboardLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
