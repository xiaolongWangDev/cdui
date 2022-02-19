import {ChangeDetectorRef, Component} from "@angular/core";
import {DynamicObservableOrchestrationService} from "../../../../service/tracked-object-orchestration.service";
import {HeatMapConfig} from "./heat-map.config";
import {map} from "rxjs/operators";
import {markAsTracked} from "../../../../Helper";
import {HeatMapData} from "../../../../model/data";
import {getOptions} from "highcharts";
import {BaseChartComponentComponent} from "../base-chart.component";

@Component({
  selector: "cd-sc-heatmap",
  template: `
    <div *ngIf="obsReady$ |async">
      <highcharts-chart
        [Highcharts]="highchartsLibrary"
        [options]="options$ | async"
        style="width: 100%; height: 400px; display: block;"
      ></highcharts-chart>
    </div>
  `
})
export class HeatMapComponent extends BaseChartComponentComponent<HeatMapConfig> {

  constructor(obsService: DynamicObservableOrchestrationService,
              changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected readyToConsumeObservables(): void {
    this.options$ =
      markAsTracked(
        this.obsService.getObservable(this.config.consumingObservables.data)
          .pipe(map((heatMapData: HeatMapData) => {
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
