import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {IntroductionPageComponent} from "./pages/introduction-page.component";
import {DemoGridSystemPageComponent} from "./pages/demo-grid-system-page.component";
import {DemoDropdownPageComponent} from "./pages/demo-dropdown-page.component";
import {DemoHeatMapPageComponent} from "./pages/demo-heat-map-page.component";
import {DemoSpendingWidgetPageComponent} from "./pages/demo-spending-widget-page.component";
import {DemoScatterPageComponent} from "./pages/demo-scatter-page.component";
import {DemoSplinePageComponent} from "./pages/demo-spline-page.component";
import {DemoTablePageComponent} from "./pages/demo-table-page.component";
import {DemoTabPageComponent} from "./pages/demo-tab-page.component";
import {DemoTypeaheadPageComponent} from "./pages/demo-typeahead-page.component";
import {DemoOlympicAppPageComponent} from "./pages/demo-olympic-app-page.component";
import {ModelPartOnePageComponent} from "./pages/model-part-one-page.component";
import {ModelPartTwoPageComponent} from "./pages/model-part-two-page.component";
import {StorePageComponent} from "./pages/store-page.component";
import {DynamicComponentPageComponent} from "./pages/dynamic-component-page.component";
import {ObservableOrchestrationPageComponent} from "./pages/observable-orchestration-page.component";
import {ObservableBestPracticePartOnePageComponent} from "./pages/observable-best-practice-part-one-page.component";
import {ObservableBestPracticePartTwoPageComponent} from "./pages/observable-best-practice-part-two-page.component";
import {FromJsonPageComponent} from "./pages/from-json-page.component";
import {JsonLiveEditPageComponent} from "./pages/json-live-edit-page.component";

const routes: Route[] = [
  {path: '', redirectTo: 'introduction', pathMatch: 'full'},
  {path: "introduction", component: IntroductionPageComponent},
  {path: "model_part_one", component: ModelPartOnePageComponent},
  {path: "model_part_two", component: ModelPartTwoPageComponent},
  {path: "from_json", component: FromJsonPageComponent},
  {path: "store", component: StorePageComponent},
  {path: "dynamic_component", component: DynamicComponentPageComponent},
  {path: "observable_orchestration", component: ObservableOrchestrationPageComponent},
  {path: "demo_grid_system", component: DemoGridSystemPageComponent},
  {path: "demo_dropdown", component: DemoDropdownPageComponent},
  {path: "demo_heat_map", component: DemoHeatMapPageComponent},
  {path: "demo_scatter", component: DemoScatterPageComponent},
  {path: "demo_spline", component: DemoSplinePageComponent},
  {path: "demo_tab", component: DemoTabPageComponent},
  {path: "demo_table", component: DemoTablePageComponent},
  {path: "demo_typeahead", component: DemoTypeaheadPageComponent},
  {path: "demo_spending_widget", component: DemoSpendingWidgetPageComponent},
  {path: "observable_best_practice_part_one", component: ObservableBestPracticePartOnePageComponent},
  {path: "observable_best_practice_part_two", component: ObservableBestPracticePartTwoPageComponent},
  {path: "demo_olympic_app", component: DemoOlympicAppPageComponent},
  {path: "json_live_edit", component: JsonLiveEditPageComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
