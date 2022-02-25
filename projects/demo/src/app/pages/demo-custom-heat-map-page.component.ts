import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration} from "configuration-driven-core";
import {SpendingWidgetConfig} from "../components/spending-widget/spending-widget.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoCustomHeatMapPageComponent {
  config = demo_custom_heat_map_conf;
}

const demo_custom_heat_map_conf = new PageConfiguration({
  title: "Custom Heat Map",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `<p>We can extend existing component and reuse most of the content without duplicating.</p>`
    }),
    new SpendingWidgetConfig()]
});



