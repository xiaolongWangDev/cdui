import {Component} from '@angular/core';
import {mock_config} from "../../helper/Helper";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <cd-page [config]="config"></cd-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoObsCreatedByParentPageComponent {
  config = mock_config.pages["demo_obs_created_by_parent"]
}
