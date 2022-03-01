import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {RowConfiguration} from "../components/row/row.config";
import {BlockConfiguration} from "../components/block/block.config";
import {AlertConfiguration} from "../components/alert/alert.config";

@Component({
  template: `
    <demo-toggle>
      <ng-template demo-toggle-target>
        <demo-page [config]="config"></demo-page>
      </ng-template>
    </demo-toggle>
  `
})
export class DemoGridSystemPageComponent {
  config = demo_grid_system_conf;
}

const demo_grid_system_conf = new PageConfiguration({
  title: "Grid System",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
              <p>The grid system is part of the CD framework standard components library.</p>

              <p>The standard components are a very thin layer built upon bootstrap and the ng-bootstrap project.
              Rather than try to be useful and complete, it serves more as a reference implementation
               for you to migrate your own library and the source of example and best practices</p>
               <p>The grid system is delivers the basic functionality of bootstrap grid.</p>
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


