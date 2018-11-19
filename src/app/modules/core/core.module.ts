import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ProjectService, UserService, AuthenticationService, AlertService } from './services';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor, ErrorInterceptor } from './helpers';

let Services = [
    ProjectService,
    UserService,
    AuthenticationService,
    AlertService
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    Services,
    AuthGuard,
    JwtInterceptor, 
    ErrorInterceptor 
  ]
})
export class CoreModule { }
