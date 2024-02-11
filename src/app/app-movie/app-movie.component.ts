import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './app-movie.component.html',
  styleUrls: ['./app-movie.component.css']
})
export class AppMovieComponent {
  @Input() movie: any;
}
