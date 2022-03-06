import {ChangeDetectorRef, Component} from "@angular/core";
import {DynamicObservableOrchestrationService} from "configuration-driven-core";
import {OlympicHeatMapConfig} from "./olympic-heat-map.config";
import {HeatMapComponent} from "../../highcharts/heatmap/heat-map.component";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Options, Tooltip, TooltipFormatterCallbackFunction, TooltipFormatterContextObject} from "highcharts";

@Component({
  selector: "demo-olympic-heat-map",
  template: `
    <div class="card" *ngIf="ready$ |async">
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
        return `${this.capitalizeFirstLetter(cellColumn)} Medal Per ${this.capitalizeFirstLetter(yColumn)}, Date`
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
                `${thisComponent.capitalizeFirstLetter(yColumn)}: ${(options.yAxis as any).categories[point.y]}<br>` +
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
                    console.log(category);
                    let subjectId;
                    if (yColumn === "sport") {
                      subjectId = thisComponent.config.consumingObservables.selectedSport
                    } else if (yColumn === "country") {
                      subjectId = thisComponent.config.consumingObservables.selectedCountry
                    }
                    thisComponent.obsService.getBehaviorSubject(subjectId).next(category);
                  }
                }
              }
            }
          }
        }
      }))
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
