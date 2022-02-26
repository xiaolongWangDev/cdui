import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {map} from "rxjs/operators";
import {markAsTracked} from "../../../../Helper";
import {ScatterData} from "../../../../model/data";
import {BaseChartComponentComponent} from "../base-chart.component";
import {DynamicObservableOrchestrationService} from "../../../../service/dynamic-observable-orchestration.service";
import {ScatterConfig} from "./scatter.config";

export const scatter_template = `<div *ngIf="obsReady$ |async">
  <highcharts-chart *ngIf="options$ | async as options"
    [Highcharts]="highchartsLibrary"
    [options]="options"
    style="width: 100%; height: 400px; display: block;"
  ></highcharts-chart>
</div>
`

@Component({
  selector: "cd-sc-scatter",
  template: scatter_template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterComponent<T extends ScatterConfig> extends BaseChartComponentComponent<T> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
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
