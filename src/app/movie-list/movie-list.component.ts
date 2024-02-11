import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: any[] = []
  errorMessage: string | null = null;

  @Input() movie: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    const apiKey = '9c4abd13';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;

    this.http.get(apiUrl).subscribe((data: any) => {
      if(data.Response === 'True'){
        console.log('API Fetch Response:', data);
        this.movies = data.Search || [];
      } else {
        this.movies = [];
      }
    });
  }

  searchMovies(searchText: string): void {
    const apiKey = '9c4abd13';

    if(!searchText) {
      this.fetchMovies();
      return;
    }

    const apiUrl = `http://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      if(data.Response === 'False') {
        this.errorMessage = data.Error;
        this.movies = [];
      } else {
        this.errorMessage = null;
        this.movies = data.Search || [];
      }
    },
    (error) => {
      this.errorMessage = 'An error occured while fetching movies.';
      this.movies = [];
    });
  }

}
