import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RowConfiguration} from "./row.config";
import {ConfigurationDrivenComponent} from "configuration-driven-core";

@Component({
  selector: "demo-row",
  template: `
    <div class="row">
      <div *ngFor="let cWidth of config.colWidth; let i = index" [ngClass]="'col-' + cWidth">
        <ng-template [cdDynamic]="config.components[i]"></ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends ConfigurationDrivenComponent<RowConfiguration> {
}
