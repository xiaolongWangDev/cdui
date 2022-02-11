import {TeacherConfiguration} from "../app/components/teacher/teacher.config";
import {StudentConfiguration} from "../app/components/student/student.config";
import {AlertConfiguration, PageConfiguration} from "configuration-driven-core";
import {HeadmasterConfiguration} from "../app/components/headmaster/headmaster.config";

export const demo_obs_created_by_parent_page_conf = new PageConfiguration({
  title: "How to safely use an observable? Part 1",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
              <p>In the CD(configuration driven) framework, when the observable is created by an ancestor component, it's safe to directly grab the reference and use.</p>
              <p>By directly I mean we don't need to pull the state up into a store, which I will show you in the next demo.</p>
              `
    }),
    new HeadmasterConfiguration({
      name: "George", yieldingObservables: {tuition: "tuition_amount_from_George"},
      manages: [
        new TeacherConfiguration({
          name: "Tom", yieldingObservables: {homework: "homework_from_tom"},
          teaches: [
            new StudentConfiguration({name: "Alice", consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}}),
            new StudentConfiguration({name: "Bob", consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}}),
            new StudentConfiguration({name: "Charlie", consumingObservables: {homework: "homework_from_tom", tuition: "tuition_amount_from_George"}}),
          ]
        }),
        new TeacherConfiguration({
          name: "Jack", yieldingObservables: {homework: "homework_from_jack"},
          teaches: [
            new StudentConfiguration({name: "Donald", consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}}),
            new StudentConfiguration({name: "Edward", consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}}),
            new StudentConfiguration({name: "Frank", consumingObservables: {homework: "homework_from_jack", tuition: "tuition_amount_from_George"}}),
          ]
        }),
      ]
    })

  ]
});
