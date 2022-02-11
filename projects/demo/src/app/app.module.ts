import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TeacherComponent} from "./components/teacher/teacher.component";
import {ConfigurationDrivenCoreModule, TrackedObjectOrchestrationService} from "configuration-driven-core";
import {StudentComponent} from "./components/student/student.component";

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    ConfigurationDrivenCoreModule.forRoot()
  ],
  providers: [
    TrackedObjectOrchestrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
