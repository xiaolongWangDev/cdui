import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {ConfigurationDrivenCoreModule, DynamicObservableOrchestrationService} from "configuration-driven-core";
import {StudentComponent} from "./components/student/student.component";
import {HeadmasterComponent} from "./components/headmaster/headmaster.component";
import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToggleComponent} from "./components/toggle/toggle.component";
import {ToggleTargetDirective} from "./components/toggle/toggle-target.directive";
import {IntroductionPageComponent} from "./pages/introduction-page.component";
import {DemoObsCreatedByParentPageComponent} from "./pages/demo-obs-created-by-parent-page.component";
import {PageComponent} from "./components/page/page.component";
import {PenPalComponent} from "./components/pen-pal/pen-pal.component";
import {PostOfficeComponent} from "./components/post-office/post-office.component";

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ToggleComponent,
    ToggleTargetDirective,
    HeadmasterComponent,
    TeacherComponent,
    StudentComponent,
    DemoObsCreatedByParentPageComponent,
    IntroductionPageComponent,
    PenPalComponent,
    PostOfficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigurationDrivenCoreModule.forRoot(),
    NgbModule,
  ],
  providers: [
    DynamicObservableOrchestrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
