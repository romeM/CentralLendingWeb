import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService, PersonService, NotificationService } from '../../core/services';
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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  projects: Project[];
  allprojects: Project[];
  lastKeypress: number = 0;
  addedProjectMessage:string = "Le projet a été mis à jour avec succès."
  deletedProjectMessage:string = "Le projet a été supprimé."

  constructor(private projectService: ProjectService, private personService: PersonService, 
    private modalService: NgbModal, private notificationService: NotificationService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadProjects();
    this.loadPersonProjects();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

    personProject.undefined=true;
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

  save(personProject){
    this.projectService.post(personProject)
      .subscribe(id => {
        personProject.undefined=false;
        personProject.id= id;
        this.notificationService.success(this.addedProjectMessage);
      });
  }
  edit(personProject){
    personProject.undefined=true;
  }

  delete(personProject){
    this.projectService.delete(personProject.id)
      .subscribe(pp => {
          const index: number = this.personProjects.indexOf(personProject);
          if (index !== -1) {
              this.personProjects.splice(index, 1);
          }   
          this.notificationService.warning(this.deletedProjectMessage);
      });
  }


}
