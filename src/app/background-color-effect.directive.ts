import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundColorEffect]',
})
export class BackgroundColorEffectDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.background = 'lightblue';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.background = 'initial';
  }
}
