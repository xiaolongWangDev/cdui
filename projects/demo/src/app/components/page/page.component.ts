import {Component, OnDestroy} from "@angular/core";
import {PageConfiguration} from "./page.config";
import {DynamicHostComponent, AnyComponentConfiguration} from "configuration-driven-core";
import {setNullAttributes} from "../../helper/Helper";

@Component({
  selector: "demo-page",
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>{{config.title}}</h1>
      <div *ngFor="let _ of config.components">
        <ng-template cd-dynamic></ng-template>
      </div>
    </div>
  `
})
export class PageComponent extends DynamicHostComponent<PageConfiguration> implements OnDestroy {

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }

  destroyExtra(): void {
    setNullAttributes(this);
  }
}
