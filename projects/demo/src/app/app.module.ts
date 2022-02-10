import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FooComponent} from "./components/foo/foo.component";
import {BarComponent} from "./components/bar/bar.component";
import {ConfigurationDrivenCoreModule, TrackedObjectOrchestrationService} from "configuration-driven-core";

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    BarComponent
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
