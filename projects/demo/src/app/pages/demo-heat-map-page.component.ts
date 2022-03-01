import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {HeatMapData} from "../model/data";
import {HeatMapConfig} from "../components/highcharts/heatmap/heat-map.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {standard_page_template} from "../components/page/page.component";

@Component({
  template: standard_page_template
})
export class DemoHeatMapPageComponent {
  config = demo_heat_map_conf;
}

const demo_heat_map_conf = new PageConfiguration({
  title: "Heat Map",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `This is a wrapper of Highcharts chart`
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
      ]
    })]
});



