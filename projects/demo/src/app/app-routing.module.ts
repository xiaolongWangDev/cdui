import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {IntroductionPageComponent} from "./pages/introduction-page.component";
import {DemoObsCreatedByAncestorPageComponent} from "./pages/demo-obs-created-by-ancestor-page.component";
import {DemoObsCreatedByNonAncestorPageComponent} from "./pages/demo-obs-created-by-non-ancestor-page.component";
import {DemoGridSystemPageComponent} from "./pages/demo-grid-system-page.component";
import {DemoDropdownPageComponent} from "./pages/demo-dropdown-page.component";
import {DemoHeatMapPageComponent} from "./pages/demo-heat-map-page.component";
import {DemoCustomHeatMapPageComponent} from "./pages/demo-custom-heat-map-page.component";

const routes: Route[] = [
  {path: '', redirectTo: 'introduction', pathMatch: 'full'},
  {path: "introduction", component: IntroductionPageComponent},
  {path: "demo_grid_system", component: DemoGridSystemPageComponent},
  {path: "demo_dropdown", component: DemoDropdownPageComponent},
  {path: "demo_heat_map", component: DemoHeatMapPageComponent},
  {path: "demo_custom_heat_map", component: DemoCustomHeatMapPageComponent},
  {path: "demo_obs_created_by_ancestor", component: DemoObsCreatedByAncestorPageComponent},
  {path: "demo_obs_created_by_non_ancestor", component: DemoObsCreatedByNonAncestorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
