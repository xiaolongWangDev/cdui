import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
  ConfigurationDrivenCoreModule
} from "../../../configuration-driven-core/src/lib/configuration-driven-core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ConfigurationDrivenCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
