import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {map} from "rxjs/operators";
import {DynamicObservableOrchestrationService, markAsTracked} from "configuration-driven-core";
import {SplineData} from "../../../model/data";
import {BaseChartComponentComponent} from "../base-chart.component";
import {SplineConfig} from "./spline.config";
import * as Highcharts from "highcharts";
import {AxisLabelsFormatterCallbackFunction} from "highcharts";

export const spline_template = `<div *ngIf="ready$ |async">
  <highcharts-chart *ngIf="options$ | async as options"
    [Highcharts]="highchartsLibrary"
    [constructorType]="'stockChart'"
    [options]="options"
    style="width: 100%; height: 400px; display: block;"
  ></highcharts-chart>
</div>
`

@Component({
  selector: "demo-spline",
  template: spline_template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplineComponent<T extends SplineConfig> extends BaseChartComponentComponent<T> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.options$ =
      markAsTracked(
        this.obsService.getObservable(this.config.consumingObservables.data)
          .pipe(
            map((dataModel: SplineData) => {
              return {
                rangeSelector: {
                  selected: 1
                },
                chart: {
                  type: 'spline',
                },
                title: {
                  text: this.config.title
                },
                xAxis: {
                  title: {
                    text: this.config.xTittle,
                  },
                  type: "datetime",
                  labels: {
                    formatter: function (): string {
                      return Highcharts.dateFormat('%b/%e/%Y', this.value as number);
                    } as AxisLabelsFormatterCallbackFunction
                  }
                },
                yAxis: {
                  title: {
                    text: this.config.yTittle,
                  },
                },
                series: [{
                  data: dataModel.data
                }]
              }
            })),
        "spline_options"
      )
  }
}
