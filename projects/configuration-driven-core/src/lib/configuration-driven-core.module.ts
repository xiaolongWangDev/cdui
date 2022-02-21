import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicDirective} from "./directive/dynamic-directive";
import {AlertComponent} from "./component/standard/alert/alert.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BlockComponent} from "./component/standard/block/block.component";
import {RowComponent} from "./component/standard/row/row.component";
import {DropdownComponent} from "./component/standard/dropdown/dropdown.component";
import {HighchartsChartModule} from "highcharts-angular";
import {HeatMapComponent} from "./component/standard/highcharts/heatmap/heat-map.component";
import {DynamicObservableOrchestrationService} from "./service/dynamic-observable-orchestration.service";


@NgModule({
  declarations: [
    DynamicDirective,
    BlockComponent,
    RowComponent,
    AlertComponent,
    DropdownComponent,
    HeatMapComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HighchartsChartModule
  ],
  exports: [
    DynamicDirective,
    BlockComponent,
    RowComponent,
    AlertComponent,
    DropdownComponent,
    HeatMapComponent
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
