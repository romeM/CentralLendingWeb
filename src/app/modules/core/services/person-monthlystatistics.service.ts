import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PersonMonthlyStatistics } from '../models';
import { PersonService } from './person.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonMonthlyStatisticsService {
    monthNames = ["Janv", "Févr", "Mars", "Avr.", "Mai", "Juin",
    "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
    ];

    constructor(private httpClient: HttpClient, private personService: PersonService) {
    }

    get(): Promise<PersonMonthlyStatistics[]> {
        return this.httpClient.get<PersonMonthlyStatistics[]>(`${environment.serverApi}/api/personmonthlystatistics/${this.personService.currentUser().id}`).toPromise()
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getDateFromPersonMonthlyStatistics(personMonthlyStatistics: Array<PersonMonthlyStatistics>): Array<string>
    {
        return personMonthlyStatistics.map(ums => 
            this.monthNames[new Date(ums.date).getUTCMonth()]
            + (new Date(ums.date).getUTCMonth() == 0 ? ' ' + new Date(ums.date).getFullYear().toString() : ''));
    }

    getIPMTFromPersonMonthlyStatistics(personMonthlyStatistics: Array<PersonMonthlyStatistics>): Array<number>
    {
        return personMonthlyStatistics.map(ums => ums.ipmt);
    }

    getPMTFromPersonMonthlyStatistics(personMonthlyStatistics: Array<PersonMonthlyStatistics>): Array<number>
    {
        return personMonthlyStatistics.map(ums => ums.pmt);
    }

    getPPMTFromPersonMonthlyStatistics(personMonthlyStatistics: Array<PersonMonthlyStatistics>): Array<number>
    {
        return personMonthlyStatistics.map(ums => ums.ppmt);
    }
    
}
