import { Component, OnInit } from '@angular/core';
import { AlertService, PersonService, NotificationService } from '../../core/services';
import { Person } from 'app/modules/core/models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  person: Person;
  loading = false;
  image: string;
  saveMessage: string = "Les modifications ont été enregistré avec succès.";

  constructor(private personService: PersonService,
    private alertService: AlertService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.person = this.personService.currentUser();
  }

  onFileChanged(event) {
    var selectedFile = event.target.files[0]
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.person.image = myReader.result.toString();
    }
    myReader.readAsDataURL(selectedFile);
  }

  onSave() {
    this.loading = true;
    this.personService.update(this.person).pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Save successful', true);
                    localStorage.setItem('currentUser', JSON.stringify(this.person));
                    this.loading = false;
                    this.notificationService.success(this.saveMessage);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
}
}