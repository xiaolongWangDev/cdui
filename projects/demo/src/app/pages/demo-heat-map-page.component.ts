import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {
  AlertConfiguration,
  StoreConfiguration,
  HeatMapConfig,
  HeatMapData,
  BlockConfiguration,
  DropdownConfiguration
} from "configuration-driven-core";
import {SpendingHeatMapConfig} from "../components/spending-heat-map/spending-heat-map.config.ts";
import {ControlBarConfig} from "../components/filter-bar/control-bar.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoHeatMapPageComponent {
  config = demo_heat_map_conf;
}

const demo_heat_map_conf = new PageConfiguration({
  title: "Heat Map",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: ``
    }), new BlockConfiguration({
      store: new StoreConfiguration({
        states: {
          "heat_map_data": new HeatMapData({
            xCategories: ["2019", "2020", "2021"],
            yCategories: ["Facebook", "Apple", "Netflex", "Google"],
            data: [[0, 0, 30.1], [0, 1, 12], [0, 2, 55], [0, 3, 0.44],
              [1, 0, 123], [1, 1, 4], [1, 2, 32], [1, 3, 7.5],
              [2, 0, 41], [2, 1, 24], [2, 2, 99], [2, 3, 9],
            ]
          })
        }
      }),
      components: [
        new HeatMapConfig({
          title: "A mysterious chart",
          xTittle: "Year",
          yTittle: "Company",
          consumingObservables: {
            data: "heat_map_data"
          }
        }),
        new AlertConfiguration({
          type: "success",
          htmlContent: `<p>We can extend existing component and reuse most of the content without duplicating.</p>`
        }),

        new ControlBarConfig({
          yieldingObservables: {
            xDropdownOptions: "spendingXDropdownOptions",
            yDropdownOptions: "spendingYDropdownOptions"
          },
          xAxisColumnsDropdownConfig: new DropdownConfiguration({
            label: "on x axis: ",
            consumingObservables: {options: "spendingXDropdownOptions"},
            yieldingObservables: {selection: "spendingXAxis"}
          }),
          yAxisColumnsDropdownConfig: new DropdownConfiguration({
            label: "on y axis: ",
            consumingObservables: {options: "spendingYDropdownOptions"},
            yieldingObservables: {selection: "spendingYAxis"}
          }),
        }),
        new SpendingHeatMapConfig({
          title: "Spending",
          xTittle: "X",
          yTittle: "$",
          consumingObservables: {
            data: "heat_map_data"
          }
        })
      ]
    })]
});



