import {
  ConfigurationDrivenComponent,
  DynamicObservableOrchestrationService,
  markAsTracked
} from "configuration-driven-core";
import {ChangeDetectorRef, Component} from "@angular/core";
import {Observable} from "rxjs";
import {MockApiService} from "../../service/mock-api.service";
import {OlympicAppConfig} from "./olympic-app.config";


@Component({
  selector: "demo-olympic-app",
  template: `
  `
})
export class OlympicAppComponent extends ConfigurationDrivenComponent<OlympicAppConfig> {

  constructor(private mockApiService: MockApiService, obsService: DynamicObservableOrchestrationService, changeDetectionRef: ChangeDetectorRef) {
    super(obsService, changeDetectionRef);
  }

  protected yieldObservablesFactories(): Record<string, () => Observable<any>> {
    return {}
    }
}
