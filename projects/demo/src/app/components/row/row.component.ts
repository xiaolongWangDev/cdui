import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AnyComponentConfiguration, DynamicHostComponent} from "configuration-driven-core";
import {RowConfiguration} from "./row.config";

@Component({
  selector: "demo-row",
  template: `
    <div class="row">
      <div *ngFor="let cWidth of config.colWidth" [ngClass]="'col-' + cWidth">
        <ng-template cd-dynamic></ng-template>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends DynamicHostComponent<RowConfiguration> {

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }
}
