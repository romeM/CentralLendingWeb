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
  loading: boolean = true;
  formA: FormGroup;
  formB: FormGroup;
  formC: FormGroup;
  projects: Project[];
  selectedPersonProject: PersonProject;
  addedProjectMessage:string = "Le projet a été mis à jour avec succès."
  deletedProjectMessage:string = "Le projet a été supprimé."

  constructor(private projectService: ProjectService, private personService: PersonService, 
    private modalService: NgbModal, private notificationService: NotificationService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadProjectsData();
    this.formA = this._formBuilder.group({
      projectId: ['', Validators.required]
    });
    this.formB = this._formBuilder.group({
      amount: ['', Validators.required]
    });
    this.formC = this._formBuilder.group({
      startDate: ['', Validators.required]
    });
  }

  loadProjectsData(){
    forkJoin(this.projectService.get(),
    this.personService.getPersonProjects())
    .subscribe(([projects, personProjects]) =>  {
      this.personProjects = personProjects;
      this.personProjects.forEach( pp => {
        projects = projects.filter(item => item.id !== pp.project.id);
      });
      this.projects = projects;
      this.loading = false;
    });
  }

  addProject() {
    this.personProjects = this.personProjects.filter(item => item.id !== undefined);
    var personProject = new PersonProject()
    this.personProjects.push(personProject);
    this.selectPersonProject(personProject);
  }

  save(personProject){
    personProject = this.patch(personProject);
    this.personService.addProject(personProject)
      .subscribe(id => {
        personProject.id= id;
        this.projects = this.projects.filter(item => item.id !== personProject.projectId);
        this.unselectPersonProject();
        this.notificationService.success(this.addedProjectMessage);
      });
  }

  patch(personProject):PersonProject{
    personProject.personId= this.personService.currentUser().id;
    personProject.projectId = this.formA.value.projectId;
    if (personProject.project == undefined)
      personProject.project = this.projects.find(p => p.id == personProject.projectId);
    personProject.amount = this.formB.value.amount;
    personProject.startDate = this.formC.value.startDate;
    return personProject;
  }

  edit(personProject){
    this.personProjects = this.personProjects.filter(item => item.id !== undefined);
    this.selectPersonProject(personProject);
  }

  cancel(personProject){
    if(personProject.id == undefined){
      this.personProjects = this.personProjects.filter(item => item !== personProject);
      this.projects.push(personProject.project);
    }

    this.unselectPersonProject();
  }

  delete(personProject){
    this.personService.removeProject(personProject.id)
      .subscribe(pp => {
        this.personProjects = this.personProjects.filter(item => item !== personProject);
        this.projects.push(personProject.project);
        this.notificationService.warning(this.deletedProjectMessage);
      });
  }

  private selectPersonProject(personProject){
    this.selectedPersonProject = personProject;
    this.formA.controls['projectId'].setValue(personProject.projectId);
    this.formB.controls['amount'].setValue(personProject.amount);
    this.formC.controls['startDate'].setValue(personProject.startDate);
  }

  private unselectPersonProject(){
    this.selectedPersonProject = undefined;
    this.formA.reset();
    this.formB.reset();
    this.formC.reset();
  }
}
