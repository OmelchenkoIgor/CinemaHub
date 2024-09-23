import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Category} from '@content/cinema';
import {TitlePipe} from '@shared/pipe';

@Component({
  standalone: true,
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  imports: [FormsModule, TitlePipe]
})
export class SearchInputComponent {
  public type: InputSignal<Category> = input.required();
  public searchQueryChange: OutputEmitterRef<string> = output();

  public searchQuery: string = '';

  public onSearch(): void {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
