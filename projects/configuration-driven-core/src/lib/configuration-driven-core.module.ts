import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {MiniStoreComponent} from "./component/mini-store/mini-store.component";
import {CommonModule} from "@angular/common";
import {DynamicDirective} from "./directive/dynamic-directive";
import {DynamicObservableOrchestrationService} from "./service/tracked-object-orchestration.service";
import {AlertComponent} from "./component/standard/alert/alert.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    DynamicDirective,
    MiniStoreComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    DynamicDirective,
    MiniStoreComponent,
    AlertComponent
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
      providers: [DynamicObservableOrchestrationService]
    };
  }
}
