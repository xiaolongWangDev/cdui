import {Component, ComponentFactoryResolver} from "@angular/core";
import {PageConfiguration} from "./page.config";
import {DynamicHostComponent} from "../base/dynamic-host-component";
import {AnyComponentConfiguration} from "../../model/types";


@Component({
  selector: "cd-page",
  template: `
    <h1>{{config.title}}</h1>
    <div class="row" *ngFor="let _ of config.components">
      <ng-template cd-dynamic></ng-template>
    </div>
  `
})
export class PageComponent extends DynamicHostComponent<PageConfiguration> {

  constructor(resolver: ComponentFactoryResolver) {
    super(resolver);
  }

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }

}
