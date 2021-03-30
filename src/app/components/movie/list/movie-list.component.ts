import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  public movieSuscription: Subscription = null;


  constructor(private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.message = '';
    this.movieSuscription = this.movieService.movies$.subscribe(
      data => {
        this.movies = data;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.message = 'Ha ocurrido un error al obtener las películas';
      });
  }

  ngOnDestroy(): void {
    this.movieSuscription.unsubscribe();    
  }
}
