import {ChangeDetectorRef, Component} from "@angular/core";
import {Observable} from "rxjs";
import {Options} from "highcharts";
import {AnyComponentConfiguration} from "../../../model/types";
import {ConfigurationDrivenComponent} from "../../base/configuration-driven-component";
import {configuredHighchartsLibrary} from "../../../model/highcharts-import";
import {DynamicObservableOrchestrationService} from "../../../service/tracked-object-orchestration.service";

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
