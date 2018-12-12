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
        return this.httpClient.get<Project[]>(`${environment.serverApi}/project`);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}
