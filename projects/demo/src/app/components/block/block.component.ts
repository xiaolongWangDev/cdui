import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BlockConfiguration} from "./block.config";
import {ConfigurationDrivenComponent} from "configuration-driven-core";

@Component({
  selector: "demo-block",
  template: `
    <div *ngFor="let childConfig of config.components">
      <ng-template [cdDynamic]="childConfig"></ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent extends ConfigurationDrivenComponent<BlockConfiguration> {
}
