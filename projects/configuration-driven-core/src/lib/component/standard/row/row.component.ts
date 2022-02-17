import {Component} from "@angular/core";
import {DynamicHostComponent} from "../../base/dynamic-host-component";
import {AnyComponentConfiguration} from "../../../model/types";
import {RowConfiguration} from "./row.config";

@Component({
  selector: "cd-sc-row",
  template: `
    <cd-store *ngIf="config.store" [config]="config.store"></cd-store>
    <div class="row">
      <div *ngFor="let cWidth of config.colWidth" [ngClass]="'col-' + cWidth">
        <ng-template cd-dynamic></ng-template>
      </div>
    </div>
  `
})
export class RowComponent extends DynamicHostComponent<RowConfiguration> {

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }
}
