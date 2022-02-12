import {Component, ContentChild} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ToggleTargetDirective} from "./toggle-target.directive";

@Component({
  "selector": "demo-toggle",
  "template": `
    <div class="m-3">
      <button class="btn btn-primary" type="button" aria-expanded="false" (click)="toggle()">
        Toggle Component
      </button>
      (this will destroy/recreate the following component)
      <hr>
    </div>
    <ng-container *ngIf="show | async">
      <ng-container [ngTemplateOutlet]="content.templateRef"></ng-container>
    </ng-container>
  `
})
export class ToggleComponent {
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @ContentChild(ToggleTargetDirective) content!: ToggleTargetDirective;

  toggle() {
    this.show.next(!this.show.getValue());
  }
}
