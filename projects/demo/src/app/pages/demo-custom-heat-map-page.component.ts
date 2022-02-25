import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration, DropdownConfiguration, StoreConfiguration} from "configuration-driven-core";
import {SpendingHeatMapConfig} from "../components/spending-heat-map/spending-heat-map.config";
import {SpendingWidgetConfig} from "../components/spending-widget/spending-widget.config";
import {ControlBarConfig} from "../components/control-bar/control-bar.config";

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
    new SpendingWidgetConfig({
      store: new StoreConfiguration({
        states: {
          "spending_x_axis": null,
          "spending_y_axis": null
        },
      }),
      consumingObservables: {
        xAxis: "spending_x_axis",
        yAxis: "spending_y_axis",
      },
      yieldingObservables: {
        heatMapData: {observableId: "spending_heat_map_data"}
      },
      controlBar: new ControlBarConfig({
        yieldingObservables: {
          xDropdownOptions: {observableId: "spending_x_dropdown_options"},
          yDropdownOptions: {observableId: "spending_y_dropdown_options"}
        },
        xAxisColumnsDropdownConfig: new DropdownConfiguration({
          label: "on x axis:",
          consumingObservables: {options: "spending_x_dropdown_options"},
          yieldingObservables: {
            selection: {
              observableId: "spending_x_axis",
              dependsOn: {
                options: "spending_x_dropdown_options"
              }
            }
          },
          keepInStore: ["spending_x_axis"]
        }),
        yAxisColumnsDropdownConfig: new DropdownConfiguration({
          label: "on y axis:",
          consumingObservables: {options: "spending_y_dropdown_options"},
          yieldingObservables: {
            selection: {
              observableId: "spending_y_axis",
              dependsOn: {options: "spending_y_dropdown_options"}
            }
          },
          keepInStore: ["spending_y_axis"]
        }),
      }),
      heatMap: new SpendingHeatMapConfig({
        title: "Spending",
        xTittle: "Time",
        yTittle: "Category",
        consumingObservables: {
          data: "spending_heat_map_data"
        }
      })
    })]
});



