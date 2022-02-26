import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {ConfigurationDrivenCoreModule, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {StudentComponent} from "./components/student/student.component";
import {HeadmasterComponent} from "./components/headmaster/headmaster.component";
import {AppRoutingModule} from "./app-routing.module";
import {ToggleComponent} from "./components/toggle/toggle.component";
import {ToggleTargetDirective} from "./components/toggle/toggle-target.directive";
import {IntroductionPageComponent} from "./pages/introduction-page.component";
import {PageComponent} from "./components/page/page.component";
import {PenPalComponent} from "./components/pen-pal/pen-pal.component";
import {PostOfficeComponent} from "./components/post-office/post-office.component";
import {DemoObsCreatedByAncestorPageComponent} from "./pages/demo-obs-created-by-ancestor-page.component";
import {DemoObsCreatedByNonAncestorPageComponent} from "./pages/demo-obs-created-by-non-ancestor-page.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PlaceholderComponent} from "./components/placeholder/placeholder.component";
import {DemoGridSystemPageComponent} from "./pages/demo-grid-system-page.component";
import {DemoDropdownPageComponent} from "./pages/demo-dropdown-page.component";
import {HighchartsChartModule} from "highcharts-angular";
import {DemoHeatMapPageComponent} from "./pages/demo-heat-map-page.component";
import {SpendingHeatMapComponent} from "./components/spending-heat-map/spending-heat-map.component";
import {SpendingWidgetComponent} from "./components/spending-widget/spending-widget.component";
import {MockApiService} from "./service/mock-api.service";
import {ControlBarComponent} from "./components/control-bar/control-bar.component";
import {DemoSpendingWidgetPageComponent} from "./pages/demo-spending-widget-page.component";

const pages = [
  IntroductionPageComponent,
  DemoGridSystemPageComponent,
  DemoDropdownPageComponent,
  DemoHeatMapPageComponent,
  DemoSpendingWidgetPageComponent,
  DemoObsCreatedByAncestorPageComponent,
  DemoObsCreatedByNonAncestorPageComponent
]

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PlaceholderComponent,
    ToggleComponent,
    ToggleTargetDirective,
    HeadmasterComponent,
    TeacherComponent,
    StudentComponent,
    PenPalComponent,
    PostOfficeComponent,
    SpendingWidgetComponent,
    ControlBarComponent,
    SpendingHeatMapComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigurationDrivenCoreModule.forRoot(),
    NgbModule,
    HighchartsChartModule,
    ConfigurationDrivenCoreModule,
    ConfigurationDrivenCoreModule,
  ],
  providers: [
    DynamicObservableOrchestrationService,
    MockApiService
  ],
  exports: [
    PlaceholderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
