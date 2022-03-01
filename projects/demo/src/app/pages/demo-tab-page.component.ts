import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {TabConfiguration} from "../components/tab/tab.config";
import {standard_page_template} from "../components/page/page.component";

@Component({
  template: standard_page_template
})
export class DemoTabPageComponent {
  config = demo_tab_conf;
}

const demo_tab_conf = new PageConfiguration({
  title: "Tabs",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
        <p>Based on ng-bootstrap nav component.</p>
        <p>Each tab content should be a dynamic CD component. In this case, they are PlaceholderComponent.</p>`
    }), new TabConfiguration({
      tabLabels: ["Tab X", "Tab Y", "Tab Z"],
      components: [
        new PlaceholderConfig({text: "Foo"}),
        new PlaceholderConfig({text: "Bar"}),
        new PlaceholderConfig({text: "FooBar"})]
    })]
});



