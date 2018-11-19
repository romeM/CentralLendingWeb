import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.serverApi}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.serverApi}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.serverApi}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.serverApi}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.serverApi}/users/` + id);
    }
}