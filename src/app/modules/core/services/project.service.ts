import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project, PersonProject } from '../models';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProjectService {

    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<Project[]> {
        return this.httpClient.get<Project[]>(`${environment.serverApi}/api/project`);
    }

    getPersonProjects(): Observable<PersonProject[]> {
        return this.httpClient.get<PersonProject[]>(`${environment.serverApi}/api/project/person`);
    }

    suggest(term): Promise<Project[]> {
        return this.httpClient.get<Project[]>(`${environment.serverApi}/api/project/suggest/` + term).toPromise()
            .catch(this.handleError);
    }

    post(personProject : PersonProject) {
        return this.httpClient.post(`${environment.serverApi}/api/project`, personProject);
    }

    delete(id : number) {
        return this.httpClient.delete(`${environment.serverApi}/api/project/${id}`);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}
