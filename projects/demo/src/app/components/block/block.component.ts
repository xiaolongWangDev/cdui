import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AnyComponentConfiguration, DynamicHostComponent} from "configuration-driven-core";
import {BlockConfiguration} from "./block.config";

@Component({
  selector: "demo-block",
  template: `
    <div *ngFor="let _ of config.components">
      <ng-template cd-dynamic></ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent extends DynamicHostComponent<BlockConfiguration> {

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }
}
