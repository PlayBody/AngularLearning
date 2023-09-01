import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {

  inputValue: string = '';

  @Input() matLabel = '';
  @Input() placeholder = '';

  @Output() filterByValue = new EventEmitter<string>();
  @Output() inputValueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const keyCode = (event.target as HTMLInputElement).value;
    this.filterByValue.emit(keyCode);
  }

  userChange(){
    this.inputValueChange.emit(this.inputValue)
  }

}
