import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {

  inputValue?: string;

  @Input() matLabel = '';
  @Input() placeholder = '';

  @Output() inputValueChange = new EventEmitter<string>();

  onInputChange() {
    this.inputValueChange.emit(this.inputValue);
  }

}
