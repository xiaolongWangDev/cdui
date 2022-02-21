import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService
} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {ControlBarConfig} from "./control-bar.config";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";


@Component({
  selector: "demo-control-bar",
  template: `
    <div class="row p-2" style="border:1px solid black;">
      <div class="col-2">
        <h4 class="pt-1">Controls:</h4>
      </div>
      <div class="col-4">
        <cd-sc-dropdown [config]="config.xAxisColumnsDropdownConfig"></cd-sc-dropdown>
      </div>
      <div class="col-4">
        <cd-sc-dropdown [config]="config.yAxisColumnsDropdownConfig"></cd-sc-dropdown>
      </div>
    </div>
  `
})
export class ControlBarComponent extends ConfigurationDrivenComponent<ControlBarConfig> {
  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToYieldObservables(): Record<string, Observable<any>> {
    const optionsData1 = of(["Monthly", "Yearly"]).pipe(delay(2000));
    const optionsData2 = of(["Entertainment", "Study"]).pipe(delay(3000));
    return {
      [this.config.yieldingObservables.xDropdownOptions]: optionsData1,
      [this.config.yieldingObservables.yDropdownOptions]: optionsData2
    }
  }
}
