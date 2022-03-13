import {Component} from '@angular/core';
import {TableConfiguration} from "../components/table/table.config";
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {TableDataFetcherConfig} from "../components/table-data-fetcher/table-data-fetcher.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Ag Grid</h1>
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
export class DemoTablePageComponent {
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
          htmlContent: `
        <p>This is a wrapper of AG grid.
        The community version does not have advanced feature like ServerSideDataSource, and sidebar....,
        so this example does not get too much to play with.
        It shows how the event can be carries out by using a behaviour subject.
        </p>`
        }, {
          _type: "BlockConfiguration",
          store: {
            _type: "StoreConfiguration",
            states: {
              table_row_click_event: "Nothing yet",
              demo_row_data: [],
              demo_column_defs: [
                {field: 'athlete'},
                {field: 'age'},
                {field: 'country'},
                {field: 'sport'},
                {field: 'year'},
                {field: 'date'},
                {field: 'gold'},
                {field: 'silver'},
                {field: 'bronze'},
                {field: 'total'},
              ]
            }
          },
          components: [
            {
              _type: "TableDataFetcherConfig",
              yieldingObservables: {
                data: {
                  observableId: "demo_row_data"
                }
              },
              keepInStore: ["demo_row_data"]
            },
            {
              _type: "PlaceholderConfig",
              text: "click a row and see event:",
              consumingObservables: {
                value: "table_row_click_event"
              }
            },
            {
              _type: "TableConfiguration",
              consumingObservables: {
                rowData: "demo_row_data",
                columnDefs: "demo_column_defs"
              },
              yieldingObservables: {
                clickEvent: {
                  observableId: "table_row_click_event",
                }
              },
              keepInStore: ["table_row_click_event"]
            },
          ]
        }]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}

// const demo_table_conf = new BlockConfiguration({
//   components: [
//     new AlertConfiguration({
//       type: "success",
//       htmlContent: `
//         <p>This is a wrapper of AG grid.
//         The community version does not have advanced feature like ServerSideDataSource, and sidebar....,
//         so this example does not get too much to play with.
//         It shows how the event can be carries out by using a behaviour subject.
//         </p>`
//     }), new BlockConfiguration({
//       store: new StoreConfiguration({
//         states: {
//           table_row_click_event: "Nothing yet",
//           demo_row_data: [],
//           demo_column_defs: [
//             {field: 'athlete'},
//             {field: 'age'},
//             {field: 'country'},
//             {field: 'sport'},
//             {field: 'year'},
//             {field: 'date'},
//             {field: 'gold'},
//             {field: 'silver'},
//             {field: 'bronze'},
//             {field: 'total'},
//           ]
//         }
//       }),
//       components: [
//         new TableDataFetcherConfig({
//           yieldingObservables: {
//             data: {
//               observableId: "demo_row_data"
//             }
//           },
//           keepInStore: ["demo_row_data"]
//         }),
//         new PlaceholderConfig({
//           text: "click a row and see event:",
//           consumingObservables: {
//             value: "table_row_click_event"
//           }
//         }),
//         new TableConfiguration({
//           consumingObservables: {
//             rowData: "demo_row_data",
//             columnDefs: "demo_column_defs"
//           },
//           yieldingObservables: {
//             clickEvent: {
//               observableId: "table_row_click_event",
//             }
//           },
//           keepInStore: ["table_row_click_event"]
//         }),
//       ]
//     })]
// });



