import {PreviewMovieListComponent, SearchMovieComponent} from '@movie/widgets';
import {Component, inject, OnInit} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-preview-movie-page',
  templateUrl: './preview-movie-page.component.html',
  styleUrl: './preview-movie-page.component.scss',
  imports: [PreviewMovieListComponent, SearchMovieComponent]
})
export default class PreviewMoviePageComponent implements OnInit {
  private readonly metaService: Meta = inject(Meta);
  private readonly titleService: Title = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('Movies');

    this.metaService.updateTag({
      name: 'description',
      content: 'Browse the most popular movies in our collection. Discover new releases and classic masterpieces. Enjoy watching anytime online.'
    });
  }
}
