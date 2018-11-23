import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../core/services';
import { User } from 'app/modules/core/models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private user: User;
  loading = false;

  constructor(private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.user = this.userService.currentUser();
  }

  onSave() {
    this.loading = true;
    this.userService.update(this.user).pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Save successful', true);
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
}
}
