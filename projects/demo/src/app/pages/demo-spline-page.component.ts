import {Component} from '@angular/core';
import {SplineData} from "../model/data";
import {BlockConfiguration} from "../components/block/block.config";
import {SplineConfig} from "../components/highcharts/spline/spline.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Spline</h1>
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
export class DemoSplinePageComponent {
  raw: any;
  config: BlockConfiguration;
  configCode: string;

  constructor(private constructionService: ConstructionService) {
    this.raw = {
      _type: "BlockConfiguration",
      components: [
        {
          _type: "AlertConfiguration",
          type: "success",
          htmlContent: `<p>This is a wrapper of Highcharts stock chart</p>`
        }, {
          _type: "BlockConfiguration",
          store: {
            _type: "StoreConfiguration",
            states: {
              "spline_data": {
                _type: "SplineData",
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
              }
            }
          },
          components: [
            {
              _type: "SplineConfig",
              title: "which city is this?",
              xTittle: "Date",
              yTittle: "Temperature",
              consumingObservables: {
                data: "spline_data"
              }
            },
          ]
        }]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}

// const demo_spine_conf = new BlockConfiguration({
//   components: [
//     new AlertConfiguration({
//       type: "success",
//       htmlContent: `<p>This is a wrapper of Highcharts stock chart</p>`
//     }), new BlockConfiguration({
//       store: new StoreConfiguration({
//         states: {
//           "spline_data": new SplineData({
//             data: [[Date.UTC(2020, 10, 25), 0],
//               [Date.UTC(2020, 11, 6), 0.25],
//               [Date.UTC(2020, 11, 20), 1.41],
//               [Date.UTC(2020, 11, 25), 1.64],
//               [Date.UTC(2021, 0, 4), 1.6],
//               [Date.UTC(2021, 0, 17), 2.55],
//               [Date.UTC(2021, 0, 24), 2.62],
//               [Date.UTC(2021, 1, 4), 2.5],
//               [Date.UTC(2021, 1, 14), 2.42],
//               [Date.UTC(2021, 2, 6), 2.74],
//               [Date.UTC(2021, 2, 14), 2.62],
//               [Date.UTC(2021, 2, 24), 2.6],
//               [Date.UTC(2021, 3, 1), 2.81],
//               [Date.UTC(2021, 3, 11), 2.63],
//               [Date.UTC(2021, 3, 27), 2.77],
//               [Date.UTC(2021, 4, 4), 2.68],
//               [Date.UTC(2021, 4, 9), 2.56],
//               [Date.UTC(2021, 4, 14), 2.39],
//               [Date.UTC(2021, 4, 19), 2.3],
//               [Date.UTC(2021, 5, 4), 2],
//               [Date.UTC(2021, 5, 9), 1.85],
//               [Date.UTC(2021, 5, 14), 1.49],
//               [Date.UTC(2021, 5, 19), 1.27],
//               [Date.UTC(2021, 5, 24), 0.99],
//               [Date.UTC(2021, 5, 29), 0.67],
//               [Date.UTC(2021, 6, 3), 0.18],
//               [Date.UTC(2021, 6, 4), 0]]
//           })
//         }
//       }),
//       components: [
//         new SplineConfig({
//           title: "which city is this?",
//           xTittle: "Date",
//           yTittle: "Temperature",
//           consumingObservables: {
//             data: "spline_data"
//           }
//         }),
//       ]
//     })]
// });



