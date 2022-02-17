import {Component} from "@angular/core";
import {DynamicHostComponent} from "../../base/dynamic-host-component";
import {AnyComponentConfiguration} from "../../../model/types";
import {BlockConfiguration} from "./block.config";

@Component({
  selector: "cd-sc-block",
  template: `
    <div *ngFor="let _ of config.components">
      <ng-template cd-dynamic></ng-template>
    </div>
  `
})
export class BlockComponent extends DynamicHostComponent<BlockConfiguration> {

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }
}
