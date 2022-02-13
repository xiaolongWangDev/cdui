import {Component} from '@angular/core';
import {demo_obs_created_by_parent_page_conf} from "../config/demo_obs_created_by_parent_page";
import {StudentConfiguration} from "../components/student/student.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <cd-page [config]="config"></cd-page>
      </ng-template>
    </demo-toggle>
<!--    <demo-student [config]="studentConfig"></demo-student>-->
  `
})
export class DemoObsCreatedByParentPageComponent {
  config = demo_obs_created_by_parent_page_conf;
  studentConfig = new StudentConfiguration({name: "Howard", consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}})
}
