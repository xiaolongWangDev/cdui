import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {
  AlertConfiguration,
  BlockConfiguration,
  SplineConfig,
  SplineData,
  StoreConfiguration
} from "configuration-driven-core";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoSplinePageComponent {
  config = demo_spine_conf;
}

const demo_spine_conf = new PageConfiguration({
  title: "Spline",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `This is a wrapper of Highcharts stock chart`
    }), new BlockConfiguration({
      store: new StoreConfiguration({
        states: {
          "spline_data": new SplineData({
            data: [[Date.UTC(2020, 10, 25), 0],
              [Date.UTC(2020, 11, 6), 0.25],
              [Date.UTC(2020, 11, 20), 1.41],
              [Date.UTC(2020, 11, 25), 1.64],
              [Date.UTC(2021, 0, 4), 1.6],
              [Date.UTC(2021, 0, 17), 2.55],
              [Date.UTC(2021, 0, 24), 2.62],
              [Date.UTC(2021, 1, 4), 2.5],
              [Date.UTC(2021, 1, 14), 2.42],
              [Date.UTC(2021, 2, 6), 2.74],
              [Date.UTC(2021, 2, 14), 2.62],
              [Date.UTC(2021, 2, 24), 2.6],
              [Date.UTC(2021, 3, 1), 2.81],
              [Date.UTC(2021, 3, 11), 2.63],
              [Date.UTC(2021, 3, 27), 2.77],
              [Date.UTC(2021, 4, 4), 2.68],
              [Date.UTC(2021, 4, 9), 2.56],
              [Date.UTC(2021, 4, 14), 2.39],
              [Date.UTC(2021, 4, 19), 2.3],
              [Date.UTC(2021, 5, 4), 2],
              [Date.UTC(2021, 5, 9), 1.85],
              [Date.UTC(2021, 5, 14), 1.49],
              [Date.UTC(2021, 5, 19), 1.27],
              [Date.UTC(2021, 5, 24), 0.99],
              [Date.UTC(2021, 5, 29), 0.67],
              [Date.UTC(2021, 6, 3), 0.18],
              [Date.UTC(2021, 6, 4), 0]]
          })
        }
      }),
      components: [
        new SplineConfig({
          title: "which city is this?",
          xTittle: "Date",
          yTittle: "Temperature",
          consumingObservables: {
            data: "spline_data"
          }
        }),
      ]
    })]
});



