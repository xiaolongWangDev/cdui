import {Component} from '@angular/core';
import {
  BlockConfiguration,
  DropdownConfiguration,
  StoreConfiguration
} from "configuration-driven-core";
import {StudentConfiguration} from "../components/student/student.config";

@Component({
  template: `
    <h1>Introduction Page</h1>
    <hr>
    <cd-sc-block [config]="config"></cd-sc-block>
  `
})
export class IntroductionPageComponent {
  config = new BlockConfiguration({
    store: new StoreConfiguration({
      states: {"drink_options": ["coke", "pepsi", "root beer", "ginger ale"]}
    }),
    components: [new DropdownConfiguration({
      label: "drink 1",
      yieldingObservables: {selection: "selected_homework"},
      consumingObservables: {options: "drink_options"}
    }),
    new DropdownConfiguration({
      label: "drink 2",
      yieldingObservables: {selection: "selected_tuition"},
      consumingObservables: {options: "drink_options"}
    }),
    new StudentConfiguration({
      name: "Bob",
      consumingObservables: {
        homework: "selected_homework",
        tuition: "selected_tuition"
      }
    })]
  });
}
