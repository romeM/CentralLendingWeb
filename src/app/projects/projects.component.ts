import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../modules/core/services/project.service';
import { Project } from '../modules/core/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.get().then(projects => this.projects = projects);
  }

}
