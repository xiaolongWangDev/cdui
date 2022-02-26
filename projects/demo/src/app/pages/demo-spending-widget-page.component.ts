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
export class DemoSpendingWidgetPageComponent {
  config = demo_spending_widget_conf;
}

const demo_spending_widget_conf = new PageConfiguration({
  title: "Widget",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
<p>The page demos the use of self-contained widget components.</p>
<p>The component does not rely on external observables. As a result, it requires zero configuration from the outside.
This is how we'd keep the configuration manageable - By creating self-contained widget units, redundant configuration details
can be hidden from the end programmer/configurator.
</p>
<p>Inside, it still uses configuration driven components and wire them together by observables.</p>
<p>In this example, the SpendingWidgetComponent consists of a ControlBarComponent and a SpendingHeatMapComponent.</p>
<p>The SpendingHeatMapComponent itself shows how easy it is to extend existing CD component and add new features.
</p>
<p>
A very brief note on the data flow: service -> dropdown options -> dropdown selections -> service -> heatmap data
</p>
<p>You probably noticed short delays when the dropdown and the heatmap is populating.
 This is set up intentional in the mock data service to mimic retrieving data from a server. </p>
`
    }),
    new SpendingWidgetConfig()]
});



