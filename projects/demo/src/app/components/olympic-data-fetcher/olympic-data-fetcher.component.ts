import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {OlympicDataFetcherConfig} from "./olympic-data-fetcher.config";
import {Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";


@Component({
  selector: "demo-olympic-data-fetcher",
  template: `
  `
})
export class OlympicDataFetcherComponent extends ConfigurationDrivenComponent<OlympicDataFetcherConfig> {

  constructor(private mockApiService: MockApiService, obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    return markAsTracked({
      [this.config.yieldingObservables.data.observableId]:
        () => this.mockApiService.getOlympicData()
    }, this.config.yieldingObservables.data.observableId)
  }
}
