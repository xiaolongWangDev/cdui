import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {StoreConfiguration} from "configuration-driven-core";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {BlockConfiguration} from "../components/block/block.config";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Dropdown</h1>
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
export class DemoDropdownPageComponent {
  config = demo_dropdown_conf;
  configCode=
`new RowConfiguration({
  store: new StoreConfiguration({
    states: {"drink_options": ["coke", "pepsi", "root beer", "ginger ale"]}
  }),
  colWidth: [4, 8],
  components: [
    new DropdownConfiguration({
      label: "Drinks: ",
      optionsObservable: "drink_options",
      selectionObservable: "selected_drink",
      keepInStore: false
    }), new PlaceholderConfig({
      text: "I'm a placeholder! I drink: ",
      consumingObservables: {
        value: "selected_drink",
      }
    })]
})`
}

const demo_dropdown_conf = new BlockConfiguration({
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
               <p>The dropdown component consumes the options, and yields the selected value.</p>
               <p>If you read carefully, you'll notice the DropdownConfiguration is taking
               the constructor args differently than what you remember. This is correct, it
               uses a SimpleConfig type which cuts off the redundant information. This shows
               how components can decide the best input data structure to use. It's a way we
               cut down configuration size</p>
              `
    }), new RowConfiguration({
      store: new StoreConfiguration({
        states: {"drink_options": ["coke", "pepsi", "root beer", "ginger ale"]}
      }),
      colWidth: [4, 8],
      components: [
        new DropdownConfiguration({
          label: "Drinks: ",
          optionsObservable: "drink_options",
          selectionObservable: "selected_drink",
          keepInStore: false
        }), new PlaceholderConfig({
          text: "I'm a placeholder! I drink: ",
          consumingObservables: {
            value: "selected_drink",
          }
        })]
    })]
});



