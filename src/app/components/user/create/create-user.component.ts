import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveUserService } from 'src/app/shared/services/save-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;
  public success: boolean;
  public submitted: boolean;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private saveUserService: SaveUserService,
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.submitted = false;
    this.success = false;
    this.createForm();
  }

  createForm() {

    this.form = this.fb.group(
      {
        id: new FormControl('', [
          Validators.required,
        ]),
        name: new FormControl('', [
          Validators.required,
        ]),
        last_name: new FormControl('', [
          Validators.required,
        ]),
      });
  }

  save() {
    this.loading = true;
    this.submitted = true;
    const user = this.form.getRawValue();

    this.saveUserService.create(user).then(
      () => {
        this.success = true;
        this.loading = false;
        this.message = "El usuario ha sido creado exitosamente.";
      },
      () => {
        this.loading = false;
        this.success = false;
        this.message = "Ha ocurrido un error al crear el usuario."
      }
    );
  }

  reset() {
    this.loading = false;
    this.submitted = false;
    this.success = false;
    this.form.reset();
  }
}
