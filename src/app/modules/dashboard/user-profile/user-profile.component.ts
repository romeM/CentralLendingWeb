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
  image: string;

  constructor(private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.user = this.userService.currentUser();
  }

  onFileChanged(event) {
    var selectedFile = event.target.files[0]
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.user.image = myReader.result.toString();
    }
    myReader.readAsDataURL(selectedFile);
  }

  onUpload() {
    
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
