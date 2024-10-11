export type cinemaProps = {
  name: string;
  release: string;
  description: string;
  genres: Array<string>;
  runtime: string;
  video: string | null;
  quality: string;
  cast: any;
  about: any;
}

export class Cinema {
  get name(): string { return this.source.name; }
  get release(): string { return this.source.release; }
  get description(): string { return this.source.description; }
  get genres(): Array<string> { return this.source.genres; }
  get runtime(): string { return this.source.runtime; }
  get video(): string | null { return this.source.video; }
  get quality(): string { return this.source.quality; }
  get cast(): any { return this.source.cast; }
  get about(): any { return this.source.about; }

  constructor(private readonly source: cinemaProps) {}
}
