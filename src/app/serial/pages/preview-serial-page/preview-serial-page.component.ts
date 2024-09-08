import {PreviewSerialListComponent, SearchSerialComponent} from '@serial/widgets';
import {Component, inject, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-preview-serial-page',
  templateUrl: './preview-serial-page.component.html',
  styleUrl: './preview-serial-page.component.scss',
  imports: [SearchSerialComponent, PreviewSerialListComponent]
})
export default class PreviewSerialPageComponent implements OnInit {
  private readonly metaService: Meta = inject(Meta);
  private readonly titleService: Title = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('TV Serial');

    this.metaService.updateTag({
      name: 'description',
      content: 'Browse the most popular movies in our collection. Discover new releases and classic masterpieces. Enjoy watching anytime online.'
    });
  }
}
