import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {MiniStoreComponent} from "./component/mini-store/mini-store.component";
import {PageComponent} from "./component/page/page.component";
import {CommonModule} from "@angular/common";
import {DynamicDirective} from "./directive/dynamic-directive";
import {TrackedObjectOrchestrationService} from "./service/tracked-object-orchestration.service";
import {AlertComponent} from "./component/standard/alert/alert.component";
import {AlertModule} from "ngx-bootstrap/alert";


@NgModule({
  declarations: [
    DynamicDirective,
    MiniStoreComponent,
    PageComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    DynamicDirective,
    MiniStoreComponent,
    PageComponent,
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
      providers: [TrackedObjectOrchestrationService]
    };
  }
}
