import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AnyComponentConfiguration, ConfigurationDrivenComponent,} from "configuration-driven-core";
import {TabConfiguration} from "./tab.config";

@Component({
  selector: "demo-tab",
  template: `
    <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
      <li *ngFor="let label of config.tabLabels; let i = index" [ngbNavItem]="i + 1">
        <a ngbNavLink>{{label}}</a>
        <ng-template ngbNavContent>
            <ng-template [cdDynamic]="config.components[i]"></ng-template>
        </ng-template>
      </li>
    </ul>
    <div [ngbNavOutlet]="nav" class="mt-2"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends ConfigurationDrivenComponent<TabConfiguration> {
  active = 1;

  protected getConfigurations(): AnyComponentConfiguration[] {
    return this.config.components;
  }
}
