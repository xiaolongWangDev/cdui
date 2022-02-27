import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration, BlockConfiguration, StoreConfiguration} from "configuration-driven-core";
import {TableConfiguration} from "../components/table/table.config";
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {OlympicDataFetcherConfig} from "../components/olympic-data-fetcher/olympic-data-fetcher.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoTablePageComponent {
  config = demo_table_conf;
}

const demo_table_conf = new PageConfiguration({
  title: "Ag Grid",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
        <p>This is a wrapper of AG grid.
        The community version does not have advanced feature like ServerSideDataSource, and sidebar....,
        so this example does not get too much to play with.
        It shows how the event can be carries out by using a behaviour subject.
        </p>`
    }), new BlockConfiguration({
      store: new StoreConfiguration({
        states: {
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
      }),
      components: [
        new OlympicDataFetcherConfig({
          yieldingObservables: {
            data: {
              observableId: "demo_row_data"
            }
          },
          keepInStore: ["demo_row_data"]
        }),
        new PlaceholderConfig({
          text: "click a row and see event:",
          consumingObservables: {
            value: "table_row_click_event"
          }
        }),
        new TableConfiguration({
          consumingObservables: {
            rowData: "demo_row_data",
            columnDefs: "demo_column_defs"
          },
          yieldingObservables: {
            clickEvent: {
              observableId: "table_row_click_event",
            }
          }
        }),
      ]
    })]
});



