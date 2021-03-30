import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();    
  }
}
