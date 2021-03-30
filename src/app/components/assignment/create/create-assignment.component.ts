import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { User } from 'src/app/shared/models/user';
import { MovieService } from 'src/app/shared/services/movie.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  public form: FormGroup;
  public userLoading: boolean;
  public movieLoading: boolean;
  public success: boolean;
  public submitted: boolean;
  public message: string;
  public users: User[];
  public movies: Movie[];
  public userSuscription: Subscription = null;
  public movieSuscription: Subscription = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.userLoading = true;
    this.movieLoading = true;
    this.submitted = false;
    this.success = false;
    this.createForm();
    this.userSuscription = this.userService.users$.subscribe(
      data => {
        this.users = data;
        this.userLoading = false;
      },
      () => {
        this.userLoading = false;
        this.message = 'Ha ocurrido un error al obtener los usuarios';
      });

    this.movieSuscription = this.movieService.movies$.subscribe(
      data => {
        this.movies = data;
        this.movieLoading = false;
      },
      () => {
        this.movieLoading = false;
        this.message = 'Ha ocurrido un error al obtener las películas';
      });


  }


  createForm() {
    this.form = this.fb.group(
      {
        user: new FormControl(null, [
          Validators.required,
        ]),
        movie: new FormControl(null, [
          Validators.required,
        ]),
      });
  }

  save() {
    this.userLoading = true;
    this.movieLoading = true;
    this.submitted = true;

    this.userService.update(this.form.get('user').value, this.form.get('movie').value).then(
      () => {
        this.success = true;
        this.userLoading = false;
        this.movieLoading = false;
        this.message = "El usuario ha sido creado exitosamente.";
      },
      () => {
        this.userLoading = false;
        this.movieLoading = false;
        this.success = false;
        this.message = "Ha ocurrido un error al crear el usuario."
      }
    );
  }

  reset() {
    this.userLoading = false;
    this.movieLoading = false;
    this.submitted = false;
    this.success = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
    this.movieSuscription.unsubscribe();
  }
}
