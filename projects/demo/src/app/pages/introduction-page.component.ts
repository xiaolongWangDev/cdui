import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {BlockConfiguration, RowConfiguration} from "configuration-driven-core";

@Component({
  template: `
    Introduction Page <hr>
    <cd-sc-block [config]="config"></cd-sc-block>
  `
})
export class IntroductionPageComponent {
  config = new BlockConfiguration({
    components: [
      new RowConfiguration({
        colWidth: [3, 3, 3, 3],
        components: [new PlaceholderConfig({text: "(1,1)"}),
          new PlaceholderConfig({text: "(1,2)"}),
          new PlaceholderConfig({text: "(1,3)"}),
          new PlaceholderConfig({text: "(1,4)"})]
      }),
      new RowConfiguration({
        colWidth: [3, 3, 3, 3],
        components: [new PlaceholderConfig({text: "(2,1)"}),
          new PlaceholderConfig({text: "(2,2)"}),
          new PlaceholderConfig({text: "(2,3)"}),
          new PlaceholderConfig({text: "(2,4)"})]
      })
    ]
  })
}
