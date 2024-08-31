type previewMovieProps = {
  id: number,
  type: string,
  title: string,
  poster: string,
  release: string,
}

export class previewMovie {
  get id(): number { return this.source.id; }
  get type(): string { return this.source.type; }
  get title(): string { return this.source.title; }
  get poster(): string { return this.source.poster; }
  get release_date(): string { return this.source.release; }

  constructor(private readonly source: previewMovieProps) {}
}
