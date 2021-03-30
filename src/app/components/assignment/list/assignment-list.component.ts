import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  public message: string;
  public userSuscription: Subscription = null;

  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.message = '';
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

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();    
  }

}
