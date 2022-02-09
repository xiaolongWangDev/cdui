import { NgModule } from '@angular/core';
import {MiniStoreComponent} from "./component/mini-store/mini-store.component";
import {PageComponent} from "./component/page/page.component";
import {CommonModule} from "@angular/common";
import {BarComponent} from "./component/dummy/bar/bar.component";
import {FooComponent} from "./component/dummy/foo/foo.component";
import {DynamicDirective} from "./directive/dynamic-directive";



@NgModule({
  declarations: [
    DynamicDirective,
    MiniStoreComponent,
    PageComponent,
    FooComponent,
    BarComponent
  ],
    imports: [
        CommonModule
    ],
  exports: [
    DynamicDirective,
    MiniStoreComponent,
    PageComponent,
    FooComponent,
    BarComponent
  ]
})
export class ConfigurationDrivenCoreModule { }
