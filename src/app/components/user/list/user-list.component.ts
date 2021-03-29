import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];
  public loading: boolean;
  public message: string;

  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.message = '';
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(
      data => {
        this.users = data;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.message = 'Ha ocurrido un error al obtener los usuarios'
      });
  }
}
