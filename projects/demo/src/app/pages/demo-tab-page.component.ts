import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {TabConfiguration} from "../components/tab/tab.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-tab [config]="config"></demo-tab>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoTabPageComponent {
  config = new TabConfiguration({
    tabLabels: ["Tab X", "Tab Y", "Tab Z"],
    components: [
      new PlaceholderConfig({text: "Foo"}),
      new PlaceholderConfig({text: "Bar"}),
      new PlaceholderConfig({text: "FooBar"})]
  });
}

const demo_tab_conf = new PageConfiguration({
  title: "Tabs",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `

              `
    }), ]
});



