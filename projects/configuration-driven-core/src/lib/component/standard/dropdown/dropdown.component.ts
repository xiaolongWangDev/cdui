import {ChangeDetectorRef, Component} from "@angular/core";
import {Observable} from "rxjs";
import {DropdownConfiguration} from "./dropdown.config";
import {ConfigurationDrivenComponent} from "../../base/configuration-driven-component";
import {StringSingleSelectModel} from "../../../model/single-selection";
import {DynamicObservableOrchestrationService} from "../../../service/dynamic-observable-orchestration.service";

@Component({
  selector: "cd-sc-dropdown",
  template: `
    <div *ngIf="obsReady$ |async">
      <span style="font-size: 25px; vertical-align: bottom">{{config.label}}</span>
      <div ngbDropdown class="d-inline-block ml-1">
        <button class="btn btn-outline-primary" ngbDropdownToggle>{{model.selectedLabel$ | async}}</button>
        <div ngbDropdownMenu *ngIf="model.options$ | async as options">
          <button *ngFor="let option of options" ngbDropdownItem (click)="handleClick($event)"
                  [value]="option">{{model.labelMapper(option)}}</button>
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent extends ConfigurationDrivenComponent<DropdownConfiguration> {
  model: StringSingleSelectModel;

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
    const options$ = this.obsService.getObservable(this.config.consumingObservables.options);
    this.model = new StringSingleSelectModel(options$);
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    return {
      [this.config.yieldingObservables.selection]: this.model.selected$
    }
  }

  handleClick($event: Event) {
    const target = $event.target as HTMLButtonElement;
    this.model.selected = target.value;
  }
}
