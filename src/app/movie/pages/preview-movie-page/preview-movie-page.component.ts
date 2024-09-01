import {PreviewMovieListComponent} from '@movie/widgets';
import {Component} from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-preview-movie-page',
  templateUrl: './preview-movie-page.component.html',
  styleUrl: './preview-movie-page.component.scss',
  imports: [
    PreviewMovieListComponent
  ]
})
export default class PreviewMoviePageComponent {

}
