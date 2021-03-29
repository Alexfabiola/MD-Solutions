import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private dbPath = '/movie';

  moviesRef: AngularFireList<Movie>;

  constructor(private db: AngularFireDatabase) {
    this.moviesRef = db.list(this.dbPath);
  }

  create(movie: Movie): any {
    return this.moviesRef.push(movie);
  }

  getAll(): AngularFireList<Movie> {
    return this.moviesRef;
  }
}
