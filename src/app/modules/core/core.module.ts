import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ProjectService } from './services/project.service';
let Services = [
    ProjectService
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    Services
  ]
})
export class CoreModule { }
