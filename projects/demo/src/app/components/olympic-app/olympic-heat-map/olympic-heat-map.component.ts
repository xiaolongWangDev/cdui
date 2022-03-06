import {ChangeDetectorRef, Component} from "@angular/core";
import {DynamicObservableOrchestrationService} from "configuration-driven-core";
import {OlympicHeatMapConfig} from "./olympic-heat-map.config";
import {HeatMapComponent} from "../../highcharts/heatmap/heat-map.component";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Options, TooltipFormatterContextObject} from "highcharts";
import {capitalizeFirstLetter} from "../../../helper/Helper";

@Component({
  selector: "demo-olympic-heat-map",
  template: `
    <div class="mt-2 card" *ngIf="ready$ |async">
      <div class="card-header">
        {{this.cardTitle$  | async}}
      </div>
      <highcharts-chart *ngIf="options$ | async as options"
                        [Highcharts]="highchartsLibrary"
                        [options]="options"
                        [style]="'width: 100%; height:' + config.height + '; display: block;'"
      ></highcharts-chart>
    </div>
  `
})
export class OlympicHeatMapComponent extends HeatMapComponent<OlympicHeatMapConfig> {

  cardTitle$: Observable<string>

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    super.setLocalData();
    this.cardTitle$ = combineLatest([
      this.obsService.getObservable(this.config.consumingObservables.cellColumn),
      this.obsService.getObservable(this.config.consumingObservables.yColumn)
    ]).pipe(
      map(([cellColumn, yColumn]) => {
        return `${capitalizeFirstLetter(cellColumn)} Medal Per ${capitalizeFirstLetter(yColumn)}, Date`
      })
    )

    const thisComponent = this;

    this.options$ =
      combineLatest([
        this.obsService.getObservable(this.config.consumingObservables.yColumn),
        this.options$]
      ).pipe(map(([yColumn, options]: [string, Options]): Options => {
        return {
          ...options,
          tooltip: {
            formatter: function () {
              const context = this as TooltipFormatterContextObject;
              const point = context.point;
              return `Date: ${(options.xAxis as any).categories[point.x]}<br>` +
                `${capitalizeFirstLetter(yColumn)}: ${(options.yAxis as any).categories[point.y]}<br>` +
                `Medal: ${point.value}`
            }
          },
          plotOptions: {
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: function () {
                    let category = (options.yAxis as any).categories[this.y];
                    thisComponent.obsService.getBehaviorSubject(
                      thisComponent.config.consumingObservables.setFilterEvent
                    ).next({
                      filterType: yColumn,
                      filterValue: category
                    });

                  }
                }
              }
            }
          }
        }
      }))
  }
}
