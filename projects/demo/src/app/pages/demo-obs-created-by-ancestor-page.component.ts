import {Component} from '@angular/core';
import {demo_obs_created_by_ancestor_page_conf} from "../config/demo_obs_created_by_ancestor_page";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoObsCreatedByAncestorPageComponent {
  config = demo_obs_created_by_ancestor_page_conf;
}
