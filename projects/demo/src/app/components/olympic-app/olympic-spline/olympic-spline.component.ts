import {ChangeDetectorRef, Component} from "@angular/core";
import {DynamicObservableOrchestrationService} from "configuration-driven-core";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Options, TooltipFormatterContextObject} from "highcharts";
import {capitalizeFirstLetter} from "../../../helper/Helper";
import {OlympicSplineConfig} from "./olympic-spline.config";
import {SplineComponent} from "../../highcharts/spline/spline.component";

@Component({
  selector: "demo-olympic-spline",
  template: `
    <div class="mt-2 card" *ngIf="ready$ |async">
      <div class="card-header">
        {{this.cardTitle$  | async}}
      </div>
      <highcharts-chart *ngIf="options$ | async as options"
                        [Highcharts]="highchartsLibrary"
                        [constructorType]="'stockChart'"
                        [options]="options"
                        [style]="'width: 100%; height:' + config.height + '; display: block;'"
      ></highcharts-chart>
    </div>
  `
})
export class OlympicSplineComponent extends SplineComponent<OlympicSplineConfig> {

  cardTitle$: Observable<string>

  constructor(obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    super.setLocalData();
    this.cardTitle$ = this.obsService.getObservable(this.config.consumingObservables.yColumn).pipe(
      map((yColumn) => {
        return ` ${capitalizeFirstLetter(yColumn)} Medal Over time`
      })
    )

    this.options$ = this.options$
      .pipe(map((options: Options): Options => {
        return {
          ...options,
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              const context = this as TooltipFormatterContextObject;
              const date = new Date(context.x)
              const dateStr = date.toISOString().split('T')[0]
              return `${dateStr}: ${context.y}`
            }
          },
          xAxis: {
            dateTimeLabelFormats: {
              year: '%Y'
            }
          },
          rangeSelector: {
            selected: 5
          },
        }
      }))
  }
}
