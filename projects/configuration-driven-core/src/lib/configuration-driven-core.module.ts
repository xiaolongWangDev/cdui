import { NgModule } from '@angular/core';
import { ConfigurationDrivenCoreComponent } from './configuration-driven-core.component';
import {MiniStoreComponent} from "./component/mini-store/mini-store.component";
import {PageComponent} from "./component/page/page.component";
import {DynamicDirective} from "./directive/DynamicDirective";
import {CommonModule} from "@angular/common";
import {BarComponent} from "./component/dummy/bar/bar.component";
import {FooComponent} from "./component/dummy/foo/foo.component";



@NgModule({
  declarations: [
    DynamicDirective,
    ConfigurationDrivenCoreComponent,
    MiniStoreComponent,
    PageComponent,
    FooComponent,
    BarComponent
  ],
    imports: [
        CommonModule
    ],
  exports: [
    ConfigurationDrivenCoreComponent
  ]
})
export class ConfigurationDrivenCoreModule { }
