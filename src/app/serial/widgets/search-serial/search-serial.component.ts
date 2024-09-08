import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {SearchInputComponent} from '@shared/components';
import {GetSearchSeriesCommand, GetSeriesCommand} from '@serial/commands';
import {PageSerialRepository, SearchSerialRepository} from '@serial/data';

@Component({
  standalone: true,
  selector: 'app-search-serial',
  templateUrl: './search-serial.component.html',
  styleUrl: './search-serial.component.scss',
  imports: [SearchInputComponent]
})
export class SearchSerialComponent {
  private readonly getSerialCommand: GetSeriesCommand = inject(GetSeriesCommand);
  private readonly getSearchSerialCommand: GetSearchSeriesCommand = inject(GetSearchSeriesCommand);

  private readonly pageSerialRepository: PageSerialRepository = inject(PageSerialRepository);
  private readonly searchSerialRepository: SearchSerialRepository = inject(SearchSerialRepository);

  public searchChange: WritableSignal<string> = signal('');

  constructor() {
    effect(() => {
      if (this.searchChange().length) {
        this.getSearchSerialCommand.execute(this.searchChange());
      }

      if (this.searchChange() === '') {
        this.searchSerialRepository.saveSearchSerial('');
        this.pageSerialRepository.saveNewPage(2)
        this.getSerialCommand.execute();
      }
    }, {allowSignalWrites: true});
  }
}
