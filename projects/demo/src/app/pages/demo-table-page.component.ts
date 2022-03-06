import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {TableConfiguration} from "../components/table/table.config";
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {standard_page_template} from "../components/page/page.component";
import {TableDataFetcherConfig} from "../components/table-data-fetcher/table-data-fetcher.config";

@Component({
  template: standard_page_template
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
        new TableDataFetcherConfig({
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



