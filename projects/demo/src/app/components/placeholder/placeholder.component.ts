import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {PlaceholderConfig} from "./placeholder.config";
import {Observable} from "rxjs";

@Component({
  selector: "demo-placeholder",
  template: `
    <div class="m-1 p-1" style="border:1px solid black;">
      {{config.text}}
      <ng-container *ngIf="obsReady$ | async">
        <ng-container *ngIf="config.parseJson">
            {{value$ | async | json}}
        </ng-container>
        <ng-container *ngIf="!config.parseJson">
            {{value$ | async}}
        </ng-container>
      </ng-container>
    </div>
  `
})
export class PlaceholderComponent extends ConfigurationDrivenComponent<PlaceholderConfig> {
  value$: Observable<any>;

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
    this.value$ = this.obsService.getObservable(this.config.consumingObservables.value);
  }
}
