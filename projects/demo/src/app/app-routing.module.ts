import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {DemoObsCreatedByParentPageComponent} from "./pages/demo-obs-created-by-parent-page.component";
import {IntroductionPageComponent} from "./pages/introduction-page.component";

const routes: Route[] = [
  {path: '', redirectTo: 'introduction', pathMatch: 'full'},
  {path: "introduction", component: IntroductionPageComponent},
  {path: "demo_obs_created_by_parent", component: DemoObsCreatedByParentPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
