import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {

  public users: User[];
  public loading: boolean;
  public success: boolean;
  public submitted: boolean;
  public message: string;
  public userSuscription: Subscription = null;
  public movieTitle: string;
  public userName: string;
  public currentUserIndex: number;
  public currentMovieIndex: string;

  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.submitted = false;
    this.success = false;
    this.message = '';
    this.users = [];
    this.userSuscription = this.userService.users$.subscribe(
      data => {
        this.users = data;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.message = 'Ha ocurrido un error al obtener los usuarios';
      });
  }

  userHasMovie(user: User) {
    return user.movies !== undefined;
  }

  informationUser(userIndex, movieIndex) {
    this.currentUserIndex = userIndex;
    this.currentMovieIndex = movieIndex;
    this.movieTitle = this.users[this.currentUserIndex].movies[this.currentMovieIndex].title;
    this.userName = this.users[this.currentUserIndex].name + ' ' + this.users[this.currentUserIndex].last_name;
  }

  removeAssignment() {
    this.loading = true;
    this.submitted = true;
    const currentUser = this.users[this.currentUserIndex];
    const currentMovie = currentUser.movies[this.currentMovieIndex];
    this.userService.delete(currentUser.key, currentMovie.key).then(
      () => {
        this.success = true;
        this.loading = false;
        this.message = 'Se ha eliminado la película ' + this.movieTitle + ' del usuario ' + this.userName;        
      },
      () => {
        this.loading = false;
        this.success = false;
        this.message = 'Ha ocurrido un error al eliminar la película ' + this.movieTitle + ' del usuario ' + this.userName;
      }
    );
  }

  reset() {
    this.loading = false;
    this.submitted = false;
    this.success = false;
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }
}
