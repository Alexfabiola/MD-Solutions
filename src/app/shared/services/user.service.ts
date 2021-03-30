import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private dbPath = '/user';

  usersRef: AngularFireList<User|any>;

  public users$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
    this.users$ = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    );
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  update(user: User, movie: Movie): any {
    const userMoviesRef = this.db.list(this.dbPath + '/' + user.key + '/movies');

    return userMoviesRef.set(movie.key, movie);
  }
}
