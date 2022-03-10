import {Component} from '@angular/core';
import {HeadmasterConfiguration} from "../components/headmaster/headmaster.config";
import {TeacherConfiguration} from "../components/teacher/teacher.config";
import {StudentConfiguration} from "../components/student/student.config";

@Component({
  templateUrl: "observable-best-practice-part-one-page.component.html"
})
export class ObservableBestPracticePartOnePageComponent {
  config = observable_best_practice_part_one_page_conf;
  configCode =
`new HeadmasterConfiguration({
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
  })`
}

const observable_best_practice_part_one_page_conf = new HeadmasterConfiguration({
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
;

