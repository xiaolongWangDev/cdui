import {Component} from '@angular/core';
import {PageConfiguration} from "../components/page/page.config";
import {
  AlertConfiguration,
  BlockConfiguration,
  SplineConfig,
  SplineData,
  StoreConfiguration
} from "configuration-driven-core";
import {TableConfiguration} from "../components/table/table.config";

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
      htmlContent: `This is a wrapper of AG grid`
    }), new BlockConfiguration({
      store: new StoreConfiguration({
        states: {
          demo_row_data: [
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000}
          ],
          demo_column_defs: [
            {field: 'make'},
            {field: 'model'},
            {field: 'price'}
          ]
        }
      }),
      components: [
        new TableConfiguration({
          consumingObservables: {
            rowData: "demo_row_data",
            columnDefs: "demo_column_defs"
          }
        }),
      ]
    })]
});



