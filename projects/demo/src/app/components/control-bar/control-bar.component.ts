import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {ControlBarConfig} from "./control-bar.config";
import {MockApiService} from "../../service/mock-api.service";


@Component({
  selector: "demo-control-bar",
  template: `
    <div class="row p-2" style="border:1px solid black;">
      <div class="col-2">
        <h4 class="pt-1">Controls:</h4>
      </div>
      <div class="col-4">
        <demo-dropdown [config]="config.xAxisColumnsDropdownConfig"></demo-dropdown>
      </div>
      <div class="col-4">
        <demo-dropdown [config]="config.yAxisColumnsDropdownConfig"></demo-dropdown>
      </div>
    </div>
  `
})
export class ControlBarComponent extends ConfigurationDrivenComponent<ControlBarConfig> {
  constructor(private readonly mockApiService: MockApiService,
              obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }
}
