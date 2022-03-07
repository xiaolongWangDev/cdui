import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
// @ts-ignore
import Prism from 'prismjs';

@Component({
  selector: 'prism, [prism]',
  template: '<ng-content></ng-content>',
  styles: [`
    :host.dark { background: #333; color: #FFF;}`
  ]
})
export class PrismComponent implements AfterViewInit {
  @Input() code: string;
  @Input() language = 'javascript';
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    const code = (this.code || this.el.nativeElement.innerText)
    const grammar = Prism.languages[this.language];
    this.el.nativeElement.innerHTML = Prism.highlight(code, grammar, this.language);
  }
}
