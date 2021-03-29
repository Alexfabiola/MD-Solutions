import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SaveUserService {

  private dbPath = '/user';

  userRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }

  create(user: User): any {
    return this.userRef.push(user);
  }
}
