import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {IntroductionPageComponent} from "./pages/introduction-page.component";
import {DemoObsCreatedByAncestorPageComponent} from "./pages/demo-obs-created-by-ancestor-page.component";
import {DemoObsCreatedByNonAncestorPageComponent} from "./pages/demo-obs-created-by-non-ancestor-page.component";
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

const routes: Route[] = [
  {path: '', redirectTo: 'introduction', pathMatch: 'full'},
  {path: "introduction", component: IntroductionPageComponent},
  {path: "model_part_one", component: ModelPartOnePageComponent},
  {path: "model_part_two", component: ModelPartTwoPageComponent},
  {path: "demo_grid_system", component: DemoGridSystemPageComponent},
  {path: "demo_dropdown", component: DemoDropdownPageComponent},
  {path: "demo_heat_map", component: DemoHeatMapPageComponent},
  {path: "demo_scatter", component: DemoScatterPageComponent},
  {path: "demo_spline", component: DemoSplinePageComponent},
  {path: "demo_tab", component: DemoTabPageComponent},
  {path: "demo_table", component: DemoTablePageComponent},
  {path: "demo_typeahead", component: DemoTypeaheadPageComponent},
  {path: "demo_spending_widget", component: DemoSpendingWidgetPageComponent},
  {path: "demo_obs_created_by_ancestor", component: DemoObsCreatedByAncestorPageComponent},
  {path: "demo_obs_created_by_non_ancestor", component: DemoObsCreatedByNonAncestorPageComponent},
  {path: "demo_olympic_app", component: DemoOlympicAppPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
