import {Component} from '@angular/core';
import {StoreConfiguration} from "configuration-driven-core";
import {AlertConfiguration} from "../components/alert/alert.config";
import {ScatterConfig} from "../components/highcharts/scatter/scatter.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ScatterData} from "../model/data";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Scatter Plot</h1>
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
export class DemoScatterPageComponent {
  config = demo_scatter_conf;
  configCode =
`new BlockConfiguration({
  store: new StoreConfiguration({
    states: {
      "scatter_data": new ScatterData({
        data: [[12, 30.1], [32, 12], [24, 55], [55, 0.44],
          [98, 123], [0, 4], [45, 32], [2, 7.5],
          [65, 41], [234, 24], [36, 99], [34, 9],
        ]
      })
    }
  }),
  components: [
    new ScatterConfig({
      title: "Another mysterious chart",
      xTittle: "bar",
      yTittle: "foo",
      consumingObservables: {
        data: "scatter_data"
      }
    }),
  ]
})`
}

const demo_scatter_conf = new BlockConfiguration({
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `<p>This is a wrapper of Highcharts chart</p>`
    }), new BlockConfiguration({
      store: new StoreConfiguration({
        states: {
          "scatter_data": new ScatterData({
            data: [[12, 30.1], [32, 12], [24, 55], [55, 0.44],
              [98, 123], [0, 4], [45, 32], [2, 7.5],
              [65, 41], [234, 24], [36, 99], [34, 9],
            ]
          })
        }
      }),
      components: [
        new ScatterConfig({
          title: "Another mysterious chart",
          xTittle: "bar",
          yTittle: "foo",
          consumingObservables: {
            data: "scatter_data"
          }
        }),
      ]
    })]
});



