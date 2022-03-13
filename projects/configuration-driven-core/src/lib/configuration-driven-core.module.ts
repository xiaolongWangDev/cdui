import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicDirective} from "./directive/dynamic-directive";
import {DynamicObservableOrchestrationService} from "./service/dynamic-observable-orchestration.service";
import {ConstructionService} from "./service/construction.service";


@NgModule({
  declarations: [
    DynamicDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DynamicDirective,
  ]
})
export class ConfigurationDrivenCoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: ConfigurationDrivenCoreModule) {
    if (parentModule) {
      throw new Error(
        'ConfigurationDrivenCoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ConfigurationDrivenCoreModule> {
    return {
      ngModule: ConfigurationDrivenCoreModule,
      providers: [DynamicObservableOrchestrationService, ConstructionService]
    };
  }
}
