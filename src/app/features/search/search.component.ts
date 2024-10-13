import {Component, effect, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {GetCinemaCommand, GetSearchCinemaCommand} from '@commands';
import {PreviewCinemaRepository} from '@data/repositories';
import {SearchInputComponent} from '@shared/components';
import {Category, Type} from '@shared/type';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [SearchInputComponent]
})
export class SearchComponent {
  private readonly getCinema: GetCinemaCommand = inject(GetCinemaCommand);
  private readonly getSearch: GetSearchCinemaCommand = inject(GetSearchCinemaCommand);

  private readonly previewCinema: PreviewCinemaRepository = inject(PreviewCinemaRepository);

  public readonly category: InputSignal<Category> = input.required();

  public searchChange: WritableSignal<string | null> = signal(null);

  constructor() {
    effect(() => {
      const type: Type = this.category() === 'all' ? 'trending' : 'discover';
      const searchValue: string | null = this.searchChange();

      if (searchValue === null) return;
      this.previewCinema.setSearchQuery(searchValue);

      if (searchValue !== '') {
        this.getSearch.execute('search', this.category(), searchValue, 1, 'en');
      } else {
        this.getCinema.execute(type, this.category(), 1, 'en');
        this.previewCinema.setNewPage(2);
      }
    }, {allowSignalWrites: true});
  }
}
