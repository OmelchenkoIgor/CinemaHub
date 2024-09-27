import {Component, computed, inject, Signal, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';
import {GetTrendingCinemaCommand} from '@commands/get-trending-cinema.command';
import {TrendingCinemaRepository} from '@data/repositories';
import {CarouselCardComponent} from '@shared/components';
import {previewCinema} from '@data/entities';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CarouselCardComponent, NgClass],
})
export class CarouselComponent implements AfterViewInit {
  public readonly trendingCinema: TrendingCinemaRepository = inject(TrendingCinemaRepository);
  private readonly getTrendingCinema: GetTrendingCinemaCommand = inject(GetTrendingCinemaCommand);

  public readonly trending: Signal<Array<previewCinema>> = computed(() => this.trendingCinema.isTrendingCinemaList());

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  public canScrollLeft: boolean = false;
  public canScrollRight: boolean = false;
  public showScrollButtons: boolean = false;

  constructor() {
    this.getTrendingCinema.execute();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkScrollPosition();
      this.updateShowScrollButtons();
    }, 100);
  }

  public scrollLeft(): void {
    const container = this.carouselContainer.nativeElement;
    const cardWidth = container.querySelector('app-carousel-card')?.offsetWidth || 0;
    container.scrollBy({left: -3 * cardWidth, behavior: 'smooth'});
  }

  public scrollRight(): void {
    const container = this.carouselContainer.nativeElement;
    const cardWidth = container.querySelector('app-carousel-card')?.offsetWidth || 0;
    container.scrollBy({left: 3 * cardWidth, behavior: 'smooth'});
  }

  public checkScrollPosition(): void {
    const container = this.carouselContainer.nativeElement;
    this.canScrollLeft = container.scrollLeft > 0;
    this.canScrollRight = container.scrollWidth > container.scrollLeft + container.clientWidth;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScrollPosition();
    this.updateShowScrollButtons();
  }

  private updateShowScrollButtons(): void {
    this.showScrollButtons = window.innerWidth > 768;
  }
}
