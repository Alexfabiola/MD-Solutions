import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[];
  public loading: boolean;
  public message: string;

  constructor(private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.message = '';
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(
      data => {
        this.movies = data;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.message = 'Ha ocurrido un error al obtener las películas';
      });
  }
}
