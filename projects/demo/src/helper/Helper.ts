import {AppConfiguration} from "../app/app-configuration";
import {PageConfiguration} from "configuration-driven-core";
import {TeacherConfiguration} from "../app/components/teacher/teacher.config";
import {StudentConfiguration} from "../app/components/student/student.config";

export const mock_config = new AppConfiguration({
    defaultLanding: "demo_obs_created_by_parent",
    pages: {
      "demo_obs_created_by_parent":
        new PageConfiguration({
          title: "Use an observable created by parent component",
          components: [
            new TeacherConfiguration({
              name: "Tom", yieldingObservables: {homeworkInput: "homework_from_tom"},
              teaches: [
                new StudentConfiguration({name: "Alice", consumingObservables: {homework: "homework_from_tom"}}),
                new StudentConfiguration({name: "Bob", consumingObservables: {homework: "homework_from_tom"}}),
                new StudentConfiguration({name: "Charlie", consumingObservables: {homework: "homework_from_tom"}}),
              ]
            }),
            new TeacherConfiguration({
              name: "Jack", yieldingObservables: {homeworkInput: "homework_from_jack"},
              teaches: [
                new StudentConfiguration({name: "Doug", consumingObservables: {homework: "homework_from_jack"}}),
                new StudentConfiguration({name: "Edward", consumingObservables: {homework: "homework_from_jack"}}),
                new StudentConfiguration({name: "Frank", consumingObservables: {homework: "homework_from_jack"}}),
              ]
            }),
          ]
        })
    }
  })
;
