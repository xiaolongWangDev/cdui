import {Component} from '@angular/core';
import {StoreConfiguration} from "configuration-driven-core";
import {HeatMapData} from "../model/data";
import {HeatMapConfig} from "../components/highcharts/heatmap/heat-map.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Heat Map</h1>
      <demo-toggle>
        <ng-template demo-toggle-target>
          <demo-block [config]="config"></demo-block>
          <hr>
          <code-card [code]="configCode"></code-card>
        </ng-template>
      </demo-toggle>
    </div>
  `
})
export class DemoHeatMapPageComponent {
  config = demo_heat_map_conf;
  configCode =
`new BlockConfiguration({
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
})`
}

const demo_heat_map_conf = new BlockConfiguration({
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `<p>This is a wrapper of Highcharts chart</p>
<p>It also shows a bit how store is used to provide data. Though it's an overkill for static data.</p>
`
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



