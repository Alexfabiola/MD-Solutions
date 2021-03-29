import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private dbPath = '/user';

  usersRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  getAll(): AngularFireList<User> {
    return this.usersRef;
  }
}
