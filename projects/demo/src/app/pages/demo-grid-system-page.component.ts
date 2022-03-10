import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {RowConfiguration} from "../components/row/row.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Grid System</h1>
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
export class DemoGridSystemPageComponent {
  config = demo_grid_system_conf;
  configCode =
`
new BlockConfiguration({
  components: [
    new RowConfiguration({
      colWidth: [3, 3, 3, 3],
      components: [new PlaceholderConfig({text: "(1,1)"}),
        new PlaceholderConfig({text: "(1,2)"}),
        new PlaceholderConfig({text: "(1,3)"}),
        new PlaceholderConfig({text: "(1,4)"})]
    }),
    new RowConfiguration({
      colWidth: [3, 3, 3, 3],
      components: [new PlaceholderConfig({text: "(2,1)"}),
        new PlaceholderConfig({text: "(2,2)"}),
        new PlaceholderConfig({text: "(2,3)"}),
        new PlaceholderConfig({text: "(2,4)"})]
    })
  ]
})`
}

const demo_grid_system_conf = new BlockConfiguration({
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
              <p>Block and Row components</p>
               <p>Using the RowComponent, you can have up to 12 columns in a row. The width are customization.
               In each column, you can put any configuration driven component.</p>
              <p>The BlockComponent can hold numbers any of configuration driven components. They will extend vertically.</p>
              `
    }),
    new BlockConfiguration({
      components: [
        new RowConfiguration({
          colWidth: [3, 3, 3, 3],
          components: [new PlaceholderConfig({text: "(1,1)"}),
            new PlaceholderConfig({text: "(1,2)"}),
            new PlaceholderConfig({text: "(1,3)"}),
            new PlaceholderConfig({text: "(1,4)"})]
        }),
        new RowConfiguration({
          colWidth: [3, 3, 3, 3],
          components: [new PlaceholderConfig({text: "(2,1)"}),
            new PlaceholderConfig({text: "(2,2)"}),
            new PlaceholderConfig({text: "(2,3)"}),
            new PlaceholderConfig({text: "(2,4)"})]
        })
      ]
    })]
});


