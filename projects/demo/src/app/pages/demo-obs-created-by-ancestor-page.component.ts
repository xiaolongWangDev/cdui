import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {HeadmasterConfiguration} from "../components/headmaster/headmaster.config";
import {TeacherConfiguration} from "../components/teacher/teacher.config";
import {StudentConfiguration} from "../components/student/student.config";
import {AlertConfiguration} from "../components/alert/alert.config";

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

const demo_obs_created_by_ancestor_page_conf = new PageConfiguration({
  title: "Configuration Driven Observable Best Practice: Part 1",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
              <p>when a component(A) want to use observables created by one of its ancestor components, it's safe to directly grab the reference and use.</p>
              <p>By directly I mean we don't need to pull the state up into a store, which I will show you in the next demo.</p>
              <p>In the following example, a student uses 2 observables: tuition from its headmaster and homework from its teacher.
              The headmaster and the teachers are the "yielding" components here, they create observables.
              The students are the consuming components. The linkage are the unique observable id strings.
              Because of the component hierarchy, the yielding components never got destroyed before the consuming.
              As a result, the observables holds valid throughout the lifespan of student component.
              </p>
              `
    }),
    new HeadmasterConfiguration({
      name: "George", yieldingObservables: {
        tuition: {
          observableId: "tuition_amount_from_George"
        }
      },
      manages: [
        new TeacherConfiguration({
          name: "Tom", yieldingObservables: {
            homework: {
              observableId: "homework_from_tom"
            }
          },
          teaches: [
            new StudentConfiguration({
              name: "Alice",
              consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
            }),
            new StudentConfiguration({
              name: "Bob",
              consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
            }),
            new StudentConfiguration({
              name: "Charlie",
              consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
            }),
          ]
        }),
        new TeacherConfiguration({
          name: "Jack", yieldingObservables: {
            homework: {
              observableId: "homework_from_jack"
            }
          },
          teaches: [
            new StudentConfiguration({
              name: "Donald",
              consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
            }),
            new StudentConfiguration({
              name: "Edward",
              consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
            }),
            new StudentConfiguration({
              name: "Frank",
              consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
            }),
          ]
        }),
      ]
    })
  ]
});

