import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ConstructionService} from "configuration-driven-core";

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
               <p>The dropdown component consumes the options, and yields the selected value.</p>
               <p>If you read carefully, you'll notice the DropdownConfiguration is taking
               the constructor args differently than what you remember. This is correct, it
               uses a SimpleConfig type which cuts off the redundant information. This shows
               how components can decide the best input data structure to use. It's a way we
               cut down configuration size</p>
              `
        }, {
          _type: "RowConfiguration",
          store: {
            states: {"drink_options": ["coke", "pepsi", "root beer", "ginger ale"]}
          },
          colWidth: [4, 8],
          components: [
            {
              _type: "DropdownConfiguration",
              label: "Drinks: ",
              optionsObservable: "drink_options",
              selectionObservable: "selected_drink",
              keepInStore: false
            }, {
              _type: "PlaceholderConfig",
              text: "I'm a placeholder! I drink: ",
              consumingObservables: {
                value: "selected_drink",
              }
            }]
        }]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}


