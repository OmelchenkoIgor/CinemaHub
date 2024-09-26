import {GetTrendingCinemaCommand} from '@commands/get-trending-cinema.command';
import {TrendingCinemaRepository} from '@data/repositories';
import {CarouselCardComponent} from '@shared/components';
import {Component, computed, inject, Signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {previewCinema} from '@data/entities';

@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [CarouselCardComponent, NgClass]
})
export class CarouselComponent {
  public readonly trendingCinema: TrendingCinemaRepository = inject(TrendingCinemaRepository);
  private readonly getTrendingCinema: GetTrendingCinemaCommand = inject(GetTrendingCinemaCommand);

  public readonly trending: Signal<Array<previewCinema>> = computed(() => this.trendingCinema.isTrendingCinemaList());

  constructor() {
    this.getTrendingCinema.execute();
  }
}
