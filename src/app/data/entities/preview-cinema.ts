import {CinemaType} from '@shared/type';

export type previewCinemaProps = {
  id: number;
  type: CinemaType;
  title: string;
  poster: string;
  release: string;
}

export class previewCinema {
  get id(): number { return this.source.id; }
  get type(): CinemaType { return this.source.type; }
  get title(): string { return this.source.title; }
  get poster(): string { return this.source.poster; }
  get release(): string { return this.source.release; }

  constructor(private readonly source: previewCinemaProps) {}
}
