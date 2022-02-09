import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: "[cd-dynamic]"
})
export class DynamicDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {
  }
}
