import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserMonthlyStatistics } from '../models';
import { UserService } from './user.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserMonthlyStatisticsService {

    constructor(private httpClient: HttpClient, private userService: UserService) {
    }

    get(): Promise<UserMonthlyStatistics[]> {
        return this.httpClient.get<UserMonthlyStatistics[]>(`${environment.serverApi}/api/usermonthlystatistics/${this.userService.currentUser().id}`).toPromise()
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}
