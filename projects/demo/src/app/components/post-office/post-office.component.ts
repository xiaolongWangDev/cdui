import {
  ConfigurationDrivenComponent
} from "configuration-driven-core";
import {PostOfficeConfig} from "./post-office.config";
import {Component} from "@angular/core";


@Component({
  selector: "demo-post-office",
  template: `
    <cd-store [config]="config.store"></cd-store>
    <div class="m-1" style="border:1px solid black;">
      <p>I'm an post office, my lifespan is longer than human</p>
      <p>Human can be destroyed and created. Their communication is always good so long as I exist</p>
      <demo-toggle>
        <ng-template demo-toggle-target>
          <demo-pen-pal [config]="config.palA"></demo-pen-pal>
        </ng-template>
      </demo-toggle>
      <demo-toggle>
        <ng-template demo-toggle-target>
          <demo-pen-pal [config]="config.palB"></demo-pen-pal>
        </ng-template>
      </demo-toggle>
    </div>
  `
})
export class PostOfficeComponent extends ConfigurationDrivenComponent<PostOfficeConfig> {
  destroyExtra(): void {
  }
}
