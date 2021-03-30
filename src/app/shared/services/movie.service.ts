import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private dbPath = '/movie';

  moviesRef: AngularFireList<Movie>;

  public movies$: Observable<any>;


  constructor(private db: AngularFireDatabase) {
    this.moviesRef = db.list(this.dbPath);
    this.movies$ = this.moviesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    );
  }

  create(movie: Movie): any {
    return this.moviesRef.push(movie);
  }
}
