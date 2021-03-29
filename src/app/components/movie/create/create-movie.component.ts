import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/shared/services/movie.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;
  public success: boolean;
  public submitted: boolean;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
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
        title: new FormControl('', [
          Validators.required,
        ]),
        description: new FormControl('', [
          Validators.required,
        ]),
      });
  }

  save() {
    this.loading = true;
    this.submitted = true;
    const user = this.form.getRawValue();

    this.movieService.create(user).then(
      () => {
        this.success = true;
        this.loading = false;
        this.message = "La película ha sido creada exitosamente.";
      },
      () => {
        this.loading = false;
        this.success = false;
        this.message = "Ha ocurrido un error al crear la película."
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
