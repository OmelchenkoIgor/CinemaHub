import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, UrlSegment} from '@angular/router';
import {DetailCinemaRepository} from '@data/repositories';
import {GetDetailInfoCinemaCommand} from '@commands';
import {Category} from '@shared/type';
import {Cinema} from '@data/entities';

@Component({
  standalone: true,
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrl: './detail-info-page.component.scss',
  imports: []
})
export class DetailInfoPageComponent implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly getDetailInfo: GetDetailInfoCinemaCommand = inject(GetDetailInfoCinemaCommand);
  public readonly detailCinemaRepository: DetailCinemaRepository = inject(DetailCinemaRepository);
  public sanitizer: DomSanitizer = inject(DomSanitizer);

  public contentType: Category | undefined;
  public contentId: string | null | undefined;
  public videoUrl: SafeResourceUrl | undefined;
  public detail: Cinema | undefined | null;

  constructor() {
    effect(() => {
      if (this.detailCinemaRepository.isDetailCinema()?.video) {
        this.detail = this.detailCinemaRepository.isDetailCinema();

        const videoLink = this.detail?.video;
        if (videoLink) {
          const videoId = this.extractVideoId(videoLink);

          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`
          );
        }
      }
    })
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: Array<UrlSegment>) => {
      if (url[0].path === 'movie') {
        this.contentType = 'movie';
      } else if (url[0].path === 'serial') {
        this.contentType = 'tv';
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.contentId = params.get('id');
    });

    if (this.contentType && this.contentId) {
      this.getDetailInfo.execute(this.contentType, this.contentId);
    }
  }

  ngOnDestroy(): void {
    this.detailCinemaRepository.setDetailCinema(null);
  }

  private extractVideoId(url: string): string | null {
    const videoIdMatch = url.match(/v=([^&]*)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }
}
