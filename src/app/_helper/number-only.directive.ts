import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  newValue?: number;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputValue = this.el.nativeElement.value;
    
    if(inputValue){
      this.newValue = inputValue.replace(/[^0-9.]/g, '');
      this.el.nativeElement.value = this.newValue;
      if (inputValue !== this.newValue) {
        event.stopPropagation();
      }
    }
    
  }
}