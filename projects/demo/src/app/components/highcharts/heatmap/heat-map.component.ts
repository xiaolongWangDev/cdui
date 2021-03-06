import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {HeatMapConfig} from "./heat-map.config";
import {map} from "rxjs/operators";
import {DynamicObservableOrchestrationService, markAsTracked} from "configuration-driven-core";
import {HeatMapData} from "../../../model/data";
import {getOptions} from "highcharts";
import {BaseChartComponentComponent} from "../base-chart.component";

export const heat_map_template = `<div *ngIf="ready$ |async">
  <highcharts-chart *ngIf="options$ | async as options"
    [Highcharts]="highchartsLibrary"
    [options]="options"
    style="width: 100%; height: 400px; display: block;"
  ></highcharts-chart>
</div>
`

@Component({
  selector: "demo-heat-map",
  template: heat_map_template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatMapComponent<T extends HeatMapConfig> extends BaseChartComponentComponent<T> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected setLocalData(): void {
    this.options$ =
      markAsTracked(
        this.obsService.getObservable(this.config.consumingObservables.data)
          .pipe(
            map((heatMapData: HeatMapData) => {
            return {
              chart: {
                type: 'heatmap',
              },
              title: {
                text: this.config.title
              },
              colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: getOptions().colors[0]
              },
              xAxis: {
                title: {
                  text: this.config.xTittle,
                },
                categories: heatMapData.xCategories,
              },
              yAxis: {
                title: {
                  text: this.config.yTittle,
                },
                categories: heatMapData.yCategories,
              },
              series: [{
                data: heatMapData.data
              }]
            }
          })),
        "heatmap_options"
      )
  }
}
