import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserMonthlyStatistics } from '../models';
import { UserService } from './user.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserMonthlyStatisticsService {
    monthNames = ["Janv", "Févr", "Mars", "Avr.", "Mai", "Juin",
    "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
    ];

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

    getDateFromUserMonthlyStatistics(userMonthlyStatistics: Array<UserMonthlyStatistics>): Array<string>
    {
        return userMonthlyStatistics.map( ums => this.monthNames[new Date(ums.date).getUTCMonth()]);
    }

    getIPMTFromUserMonthlyStatistics(userMonthlyStatistics: Array<UserMonthlyStatistics>): Array<number>
    {
        return userMonthlyStatistics.map( ums => ums.ipmt);
    }

    getPMTFromUserMonthlyStatistics(userMonthlyStatistics: Array<UserMonthlyStatistics>): Array<number>
    {
        return userMonthlyStatistics.map( ums => ums.pmt);
    }

    getPPMTFromUserMonthlyStatistics(userMonthlyStatistics: Array<UserMonthlyStatistics>): Array<number>
    {
        return userMonthlyStatistics.map( ums => ums.ppmt);
    }
    
}
