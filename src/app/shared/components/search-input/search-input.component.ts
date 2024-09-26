import {Component, input, InputSignal, OnInit, output, OutputEmitterRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TitlePipe} from '@shared/pipe';
import {Category} from '@shared/type';

@Component({
  standalone: true,
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  imports: [FormsModule, TitlePipe]
})
export class SearchInputComponent implements OnInit {
  public type: InputSignal<Category> = input.required();
  public searchQueryChange: OutputEmitterRef<string> = output();

  public searchQuery: string = '';
  public typeName: Category | undefined;

  ngOnInit(): void {
    this.typeName = this.type() === 'all' ? 'multi' : this.type();
  }

  public onSearch(): void {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
