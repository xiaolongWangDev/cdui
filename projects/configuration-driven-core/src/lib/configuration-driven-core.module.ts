import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicDirective} from "./directive/dynamic-directive";
import {DynamicObservableOrchestrationService} from "./service/tracked-object-orchestration.service";
import {AlertComponent} from "./component/standard/alert/alert.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BlockComponent} from "./component/standard/block/block.component";
import {RowComponent} from "./component/standard/row/row.component";
import {DropdownComponent} from "./component/standard/dropdown/dropdown.component";


@NgModule({
  declarations: [
    DynamicDirective,
    BlockComponent,
    RowComponent,
    AlertComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    DynamicDirective,
    BlockComponent,
    RowComponent,
    AlertComponent,
    DropdownComponent
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
