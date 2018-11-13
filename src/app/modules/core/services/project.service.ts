import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProjectService {

    constructor(private httpClient: HttpClient) {
    }

    get(): Promise<Project[]> {
        return this.httpClient.get<Project[]>(environment.serverApi +`/api/project`).toPromise()
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}
