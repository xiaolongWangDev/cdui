import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {map} from "rxjs/operators";
import {DynamicObservableOrchestrationService} from "configuration-driven-core";
import {OlympicScatterPlotConfig} from "./olympic-scatter-plot.config";
import {ScatterComponent} from "../../highcharts/scatter/scatter.component";
import {combineLatest, Observable} from "rxjs";
import {capitalizeFirstLetter} from "../../../helper/Helper";
import {numberFormat, Options, SeriesScatterOptions, TooltipFormatterContextObject} from "highcharts";
import {ScatterData} from "../../../model/data";

@Component({
  selector: "demo-olympic-scatter",
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OlympicScatterPlotComponent extends ScatterComponent<OlympicScatterPlotConfig> {
  cardTitle$: Observable<string>

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.cardTitle$ = combineLatest([
      this.obsService.getObservable(this.config.consumingObservables.xColumn),
      this.obsService.getObservable(this.config.consumingObservables.pivotColumn)
    ]).pipe(
      map(([xColumn, pivotColumn]) => {
        return `${capitalizeFirstLetter(xColumn)} And Medal Per ${capitalizeFirstLetter(pivotColumn)}`
      })
    )
    const thisComponent = this;

    this.options$ =
      combineLatest([
        this.obsService.getObservable(this.config.consumingObservables.data),
        this.obsService.getObservable(this.config.consumingObservables.xColumn),
        this.obsService.getObservable(this.config.consumingObservables.pivotColumn)
        ]
      ).pipe(map(([dataModel, xColumn, pivotColumn]: [ScatterData, string, string]): Options => {
        return {
          chart: {
            type: 'scatter',
          },
          title: {
            text: undefined
          },
          xAxis: {
            title: {
              text: capitalizeFirstLetter(xColumn) + "(Avg)",
            },
          },
          yAxis: {
            title: {
              text: "Medal(Avg)",
            },
          },
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              const context = this as TooltipFormatterContextObject;
              const point = context.point;
              const pivot = (point.options as any)['pivot'];
              return `${pivot} <br>Medals: ${numberFormat(point.y, 2)} <br>${capitalizeFirstLetter(xColumn)}: ${numberFormat(point.x, 2)}`
            }
          },
          plotOptions: {
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: function () {
                    const pivotValue = (this.options as any)['pivot']
                    thisComponent.obsService.getBehaviorSubject(
                      thisComponent.config.consumingObservables.setFilterEvent
                    ).next({
                      filterType: pivotColumn,
                      filterValue: pivotValue
                    });
                  }
                }
              }
            }
          },
          series: [{
            data: dataModel.data,
            keys: ["x", "y", "pivot"]
          } as SeriesScatterOptions]
        }
      }))

  }
}
