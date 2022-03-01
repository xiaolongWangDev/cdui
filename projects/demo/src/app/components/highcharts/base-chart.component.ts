import {ChangeDetectorRef, Component} from "@angular/core";
import {Observable} from "rxjs";
import {Options} from "highcharts";
import {
  AnyComponentConfiguration,
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService
} from "configuration-driven-core";
import {configuredHighchartsLibrary} from "../../model/highcharts-import";

@Component({
  template: ``
})
export abstract class BaseChartComponentComponent<CONF_TYPE extends AnyComponentConfiguration>
  extends ConfigurationDrivenComponent<CONF_TYPE> {
  highchartsLibrary = configuredHighchartsLibrary;
  options$: Observable<Options>;

  protected constructor(obsService: DynamicObservableOrchestrationService,
                        changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }
}
