import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {AlertConfiguration} from "../components/alert/alert.config";
import {ScatterConfig} from "../components/highcharts/scatter/scatter.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ScatterData} from "../model/data";
import {standard_page_template} from "../components/page/page.component";

@Component({
  template: standard_page_template
})
export class DemoScatterPageComponent {
  config = demo_scatter_conf;
}

const demo_scatter_conf = new PageConfiguration({
  title: "Scatter Plot",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `This is a wrapper of Highcharts chart`
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



