import {ChangeDetectorRef, Component} from "@angular/core";
import {ConfigurationDrivenComponent, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {SpendingWidgetConfig} from "./spending-widget.config";
import {combineLatest, Observable} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";
import {MockApiService} from "../../service/mock-api.service";
import {markAsTracked} from "../../../../../configuration-driven-core/src/lib/Helper";

@Component({
  selector: "demo-spending-widget",
  template: `
    <demo-control-bar [config]="config.controlBar"></demo-control-bar>
    <demo-spending-heat-map [config]="config.heatMap"></demo-spending-heat-map>
  `
})
export class SpendingWidgetComponent extends ConfigurationDrivenComponent<SpendingWidgetConfig> {

  constructor(private readonly mockApiService: MockApiService,
              obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    let heatMapDataObservableId = this.config.yieldingObservables.heatMapData.observableId;
    return {
      [heatMapDataObservableId]:
        () => markAsTracked(combineLatest([
          this.obsService.getObservable(this.config.consumingObservables.xAxis),
          this.obsService.getObservable(this.config.consumingObservables.yAxis)])
          .pipe(filter(([xAxis, yAxis]) => xAxis != null && yAxis != null),
            mergeMap(([xAxis, yAxis]) => {
              return this.mockApiService.getSpendingHeatMapData(xAxis, yAxis)
            })
          ), heatMapDataObservableId),
      [this.config.yieldingObservables.xDropdownOptions.observableId]: () => this.mockApiService.getSpendingXOptions(),
      [this.config.yieldingObservables.yDropdownOptions.observableId]: () => this.mockApiService.getSpendingYOptions()
    }
  }
}


