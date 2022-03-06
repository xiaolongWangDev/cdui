import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {map} from "rxjs/operators";
import {DynamicObservableOrchestrationService, markAsTracked} from "configuration-driven-core";
import {ScatterData} from "../../../model/data";
import {BaseChartComponentComponent} from "../base-chart.component";
import {ScatterConfig} from "./scatter.config";

export const scatter_template = `<div *ngIf="ready$ |async">
  <highcharts-chart *ngIf="options$ | async as options"
    [Highcharts]="highchartsLibrary"
    [options]="options"
    style="width: 100%; height: 400px; display: block;"
  ></highcharts-chart>
</div>
`

@Component({
  selector: "demo-scatter",
  template: scatter_template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterComponent<T extends ScatterConfig> extends BaseChartComponentComponent<T> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.options$ =
      markAsTracked(
        this.obsService.getObservable(this.config.consumingObservables.data)
          .pipe(
            map((dataModel: ScatterData) => {
            return {
              chart: {
                type: 'scatter',
              },
              title: {
                text: this.config.title
              },
              xAxis: {
                title: {
                  text: this.config.xTittle,
                },
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
        "scatter_options"
      )
  }
}
