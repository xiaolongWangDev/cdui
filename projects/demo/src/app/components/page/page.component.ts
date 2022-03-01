import {ChangeDetectionStrategy, Component} from "@angular/core";
import {PageConfiguration} from "./page.config";
import {ConfigurationDrivenComponent} from "configuration-driven-core";

@Component({
  selector: "demo-page",
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>{{config.title}}</h1>
      <div *ngFor="let childConfig of config.components">
        <ng-template [cdDynamic]="childConfig"></ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends ConfigurationDrivenComponent<PageConfiguration>{
}
