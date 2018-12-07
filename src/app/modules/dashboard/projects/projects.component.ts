import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService, PersonService, NotificationService } from '../../core/services';
import { Project, PersonProject } from '../../core/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  personProjects: PersonProject[] = [];
  formA: FormGroup;
  formB: FormGroup;
  projects: Project[];
  addedProjectMessage:string = "Le projet a été mis à jour avec succès."
  deletedProjectMessage:string = "Le projet a été supprimé."

  constructor(private projectService: ProjectService, private personService: PersonService, 
    private modalService: NgbModal, private notificationService: NotificationService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadProjectsData();
    this.formA = this._formBuilder.group({
      amount: ['', Validators.required]
    });
    this.formB = this._formBuilder.group({
      startDate: ['', Validators.required]
    });
  }

  loadProjectsData(){
    forkJoin(this.projectService.get(),
    this.projectService.getPersonProjects())
    .subscribe(([projects, personProjects]) =>  {
      this.personProjects = personProjects;
      this.personProjects.forEach( pp => {
        projects = projects.filter(item => item.id !== pp.project.id);
      });
      this.projects = projects;
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
    this.projects = this.removeProjectFromList($event, this.projects);

    personProject.undefined=true;
  }

  save(personProject){
    personProject.amount = this.formA.value.amount;
    personProject.startDate = this.formB.value.startDate;
    this.projectService.post(personProject)
      .subscribe(id => {
        personProject.undefined=false;
        personProject.id= id;
        this.notificationService.success(this.addedProjectMessage);
      });
  }

  edit(personProject){
    this.formA.controls['amount'].setValue(personProject.amount);
    this.formB.controls['startDate'].setValue(personProject.startDate);
    personProject.undefined=true;
  }

  cancel(personProject){
    if (personProject.id == undefined){
      this.personProjects = this.removeProjectFromList(personProject, this.personProjects);
    } 
    else{
      personProject.undefined=false;
    }
  }

  delete(personProject){
    this.projectService.delete(personProject.id)
      .subscribe(pp => {
        this.personProjects = this.removeProjectFromList(personProject, this.personProjects);
        this.projects.push(personProject.project);
          this.notificationService.warning(this.deletedProjectMessage);
      });
  }

  private removeProjectFromList(project, list)
  {   
    return list.filter(item => item.id !== project.id);
  }
}
