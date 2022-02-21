import {ChangeDetectorRef, Component} from "@angular/core";
import {
  HeatMapComponent,
  DynamicObservableOrchestrationService,
  heat_map_template,
  markAsTracked
} from "configuration-driven-core";
import {map} from "rxjs/operators";
import {SpendingHeatMapConfig} from "./spending-heat-map.config.ts";
import {Options} from "highcharts";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: "demo-spending-heat-map",
  template: "<span *ngIf='fromCellStr$ | async as fromCellStr'>click event from cell {{fromCellStr}}</span>" + heat_map_template
})
export class SpendingHeatMapComponent extends HeatMapComponent<SpendingHeatMapConfig> {

  public fromCellStr$: BehaviorSubject<String> = markAsTracked(new BehaviorSubject<String>(null), "spending_heat_map_from_cell_str");

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
    super.readyToConsumeObservables();
    const thisComponent = this;
    this.options$ = markAsTracked(this.options$.pipe(map((options) => {
      return {
        ...options,
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  thisComponent.fromCellStr$.next(`(${this.x}, ${this.y})`);
                }
              }
            }
          }
        },
      } as Options;
    })), "spending_heat_map_options");
  }
}
