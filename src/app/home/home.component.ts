import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../modules/core/models';
import { UserService } from '../modules/core/services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = userService.currentUser();
    }

    ngOnInit() {
    }

}