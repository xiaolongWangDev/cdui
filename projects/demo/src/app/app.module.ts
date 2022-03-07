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
import {DemoScatterPageComponent} from "./pages/demo-scatter-page.component";
import {DemoSplinePageComponent} from "./pages/demo-spline-page.component";
import {AgGridModule} from "ag-grid-angular";
import {TableComponent} from "./components/table/table.component";
import {DemoTablePageComponent} from "./pages/demo-table-page.component";
import {HttpClientModule} from "@angular/common/http";
import {AlertComponent} from "./components/alert/alert.component";
import {BlockComponent} from "./components/block/block.component";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {RowComponent} from "./components/row/row.component";
import {ScatterComponent} from "./components/highcharts/scatter/scatter.component";
import {HeatMapComponent} from "./components/highcharts/heatmap/heat-map.component";
import {SplineComponent} from "./components/highcharts/spline/spline.component";
import {TabComponent} from "./components/tab/tab.component";
import {DemoTabPageComponent} from "./pages/demo-tab-page.component";
import {OlympicAppComponent} from "./components/olympic-app/olympic-app.component";
import {TypeaheadComponent} from "./components/typeahead/typeahead.component";
import {DemoTypeaheadPageComponent} from "./pages/demo-typeahead-page.component";
import {FormsModule} from "@angular/forms";
import {DemoOlympicAppPageComponent} from "./pages/demo-olympic-app-page.component";
import {TopPlayersComponent} from "./components/olympic-app/top-players/top-players.component";
import {OlympicHeatMapComponent} from "./components/olympic-app/olympic-heat-map/olympic-heat-map.component";
import {
  OlympicScatterPlotComponent
} from "./components/olympic-app/olympic-scatter-plot/olympic-scatter-plot.component";
import {TableDataFetcherComponent} from "./components/table-data-fetcher/table-data-fetcher.component";
import {OlympicSplineComponent} from "./components/olympic-app/olympic-spline/olympic-spline.component";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-scss';
import {PrismComponent} from "./components/prism/prism.component";
import {ModelPartOnePageComponent} from "./pages/model-part-one-page.component";
import {ModelPartTwoPageComponent} from "./pages/model-part-two-page.component";

const pages = [
  IntroductionPageComponent,
  DemoGridSystemPageComponent,
  DemoDropdownPageComponent,
  DemoTablePageComponent,
  DemoTabPageComponent,
  DemoHeatMapPageComponent,
  DemoScatterPageComponent,
  DemoSplinePageComponent,
  DemoTypeaheadPageComponent,
  DemoSpendingWidgetPageComponent,
  DemoObsCreatedByAncestorPageComponent,
  DemoObsCreatedByNonAncestorPageComponent,
  DemoOlympicAppPageComponent,
  ModelPartOnePageComponent,
  ModelPartTwoPageComponent
]

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    BlockComponent,
    DropdownComponent,
    RowComponent,
    ScatterComponent,
    SplineComponent,
    HeatMapComponent,
    PageComponent,
    TabComponent,
    TableDataFetcherComponent,
    TableComponent,
    TypeaheadComponent,
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
    OlympicAppComponent,
    OlympicSplineComponent,
    OlympicHeatMapComponent,
    OlympicScatterPlotComponent,
    TopPlayersComponent,
    PrismComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ConfigurationDrivenCoreModule.forRoot(),
    NgbModule,
    HighchartsChartModule,
    AgGridModule,
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
