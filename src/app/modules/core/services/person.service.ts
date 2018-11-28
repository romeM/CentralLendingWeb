import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person } from '../models';

import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonService {
    constructor(private http: HttpClient) { }

    currentUser() : Person {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getAll() {
        return this.http.get<Person[]>(`${environment.serverApi}/person`);
    }

    getById(id: number) {
        return this.http.get(`${environment.serverApi}/person/` + id);
    }

    register(person: Person) {
        return this.http.post(`${environment.serverApi}/person/register`, person);
    }

    update(person: Person) {
        return this.http.put(`${environment.serverApi}/person/` + person.id, person);
    }

    delete(id: number) {
        return this.http.delete(`${environment.serverApi}/person/` + id);
    }
}