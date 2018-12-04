import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService, PersonService } from '../../core/services';
import { Project, PersonProject } from '../../core/models';
import { delay } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  personProjects: PersonProject[] = [];
  projects: Project[];
  allprojects: Project[];
  lastKeypress: number = 0;

  constructor(private projectService: ProjectService, private personService: PersonService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadProjects();
    this.loadPersonProjects();
  }

  openSelect(select: NgSelectComponent) {
    select.open();
}

  closeSelect(select: NgSelectComponent) {
      select.close();
  }

  onChange($event){
    var personProject = new PersonProject()
    personProject.projectId= $event.id; 
    personProject.personId= this.personService.currentUser().id;
    personProject.project = $event;
    this.personProjects.push(personProject);
    const index: number = this.allprojects.indexOf($event);
    if (index !== -1) {
        this.allprojects.splice(index, 1);
    }        
  }

  private loadProjects() {
    this.projectService.get().pipe(delay(500)).subscribe(projects => {
        this.allprojects = projects;
        this.projects = [...this.allprojects];
    });
  }

  private loadPersonProjects() {
    this.projectService.getPersonProjects().subscribe(personProjects => {
        this.personProjects = personProjects;
    });
  }

  savePersonProject(personProject){
    this.projectService.post(personProject).subscribe();
  }

}
