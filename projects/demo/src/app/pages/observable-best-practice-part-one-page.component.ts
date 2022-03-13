import {Component} from '@angular/core';
import {HeadmasterConfiguration} from "../components/headmaster/headmaster.config";
import {TeacherConfiguration} from "../components/teacher/teacher.config";
import {StudentConfiguration} from "../components/student/student.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  templateUrl: "observable-best-practice-part-one-page.component.html"
})
export class ObservableBestPracticePartOnePageComponent {
  raw: any;
  config: HeadmasterConfiguration;
  configCode: string;

  constructor(private constructionService: ConstructionService) {
    this.raw = schoolRaw;
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw,null, "  ")
  }
}

export const schoolRaw = {
  _type: "HeadmasterConfiguration",
  name: "George", yieldingObservables: {
    tuition: {
      observableId: "tuition_amount_from_George"
    }
  },
  manages: [
    {
      _type: "TeacherConfiguration",
      name: "Tom", yieldingObservables: {
        homework: {
          observableId: "homework_from_tom"
        }
      },
      teaches: [
        {
          _type: "StudentConfiguration",
          name: "Alice",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        },
        {
          _type: "StudentConfiguration",
          name: "Bob",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        },
        {
          _type: "StudentConfiguration",
          name: "Charlie",
          consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
        },
      ]
    },
    {
      _type: "TeacherConfiguration",
      name: "Jack", yieldingObservables: {
        homework: {
          observableId: "homework_from_jack"
        }
      },
      teaches: [
        {
          _type: "StudentConfiguration",
          name: "Donald",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        },
        {
          _type: "StudentConfiguration",
          name: "Edward",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        },
        {
          _type: "StudentConfiguration",
          name: "Frank",
          consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
        },
      ]
    },
  ]
}

// export const schoolUseClasses = new HeadmasterConfiguration({
//     name: "George", yieldingObservables: {
//       tuition: {
//         observableId: "tuition_amount_from_George"
//       }
//     },
//     manages: [
//       new TeacherConfiguration({
//         name: "Tom", yieldingObservables: {
//           homework: {
//             observableId: "homework_from_tom"
//           }
//         },
//         teaches: [
//           new StudentConfiguration({
//             name: "Alice",
//             consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
//           }),
//           new StudentConfiguration({
//             name: "Bob",
//             consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
//           }),
//           new StudentConfiguration({
//             name: "Charlie",
//             consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}
//           }),
//         ]
//       }),
//       new TeacherConfiguration({
//         name: "Jack", yieldingObservables: {
//           homework: {
//             observableId: "homework_from_jack"
//           }
//         },
//         teaches: [
//           new StudentConfiguration({
//             name: "Donald",
//             consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
//           }),
//           new StudentConfiguration({
//             name: "Edward",
//             consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
//           }),
//           new StudentConfiguration({
//             name: "Frank",
//             consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}
//           }),
//         ]
//       }),
//     ]
//   })

