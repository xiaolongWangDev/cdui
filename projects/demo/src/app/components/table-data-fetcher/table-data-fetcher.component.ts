import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";
import {TableDataFetcherConfig} from "./table-data-fetcher.config";


@Component({
  selector: "demo-table-data-fetcher",
  template: `
  `
})
export class TableDataFetcherComponent extends ConfigurationDrivenComponent<TableDataFetcherConfig> {

  constructor(private mockApiService: MockApiService, obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    return markAsTracked({
      [this.config.yieldingObservables.data.observableId]:
        () => this.mockApiService.getOlympicData([] )
    }, this.config.yieldingObservables.data.observableId)
  }
}
