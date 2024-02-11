import { Component } from '@angular/core';
import { MovieAtt } from './movie-att';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'challenge-xpertgo';

  movieAttList: MovieAtt[] = [

  ];
}
