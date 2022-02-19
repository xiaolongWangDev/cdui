import {ChangeDetectorRef, Component} from "@angular/core";
import {
  HeatMapComponent,
  DynamicObservableOrchestrationService,
  heat_map_template,
  markAsTracked
} from "configuration-driven-core";
import {map} from "rxjs/operators";
import {SpendingHeatMapConfig} from "./spending-heat-map.config.ts";

@Component({
  selector: "demo-spending-heat-map",
  template: heat_map_template
})
export class SpendingHeatMapComponent extends HeatMapComponent<SpendingHeatMapConfig> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
    super.readyToConsumeObservables();
    this.options$ = markAsTracked(this.options$.pipe(map((options) => {
      return {
        ...options,
        title: {
          text: "overridden"
        }
      };
    })), "spending_heat_map_options");
  }
}
