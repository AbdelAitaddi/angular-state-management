import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[input-ref]',
})
export class InputRefDirective {
  @HostBinding('class.focus') focus: boolean = false;

  @HostListener('focus', ['$event.target'])
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur', ['$event.target'])
  onBlur() {
    this.focus = false;
  }
}
