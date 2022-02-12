import {Directive, TemplateRef} from "@angular/core";

@Directive({
  "selector": "[demo-toggle-target]",
})
export class ToggleTargetDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
