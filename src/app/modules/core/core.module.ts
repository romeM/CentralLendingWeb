import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// SERVICES
import { ProjectService, PersonService, AuthenticationService, AlertService, PersonMonthlyStatisticsService, NotificationService } from './services';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor, ErrorInterceptor } from './helpers';

let Services = [
    ProjectService,
    PersonService,
    AuthenticationService,
    AlertService,
    PersonMonthlyStatisticsService,
    NotificationService
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
