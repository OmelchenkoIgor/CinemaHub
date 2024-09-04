import {Component, input, InputSignal} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  imports: []
})
export class LoadingSpinnerComponent {
  public text: InputSignal<string> = input.required();
}
