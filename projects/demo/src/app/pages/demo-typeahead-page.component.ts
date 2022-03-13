import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {TypeaheadConfiguration} from "../components/typeahead/typeahead.config";
import {BlockConfiguration} from "../components/block/block.config";
import {ConstructionService} from "configuration-driven-core";

@Component({
  template: `
    <div class="mt-2 ml-5 mr-5 mb-2">
      <h1>Typeahead</h1>
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
export class DemoTypeaheadPageComponent {
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
        <p>Based on ng-bootstrap typeahead component.</p>
        <p>It's very similar to the dropdown component.
        But it's added the capability to accept selected value
        from the outside. (to support chart click driven filter change
        in the Olympic App). Read the class for the detail.
        It also demos how "optional" observable (the newSelection field)
        is (not) used.
        </p>
`
        },
        {
          _type: "BlockConfiguration",
          store: {
            states: {
              "selected_car": null,
              "cars": ["audi", "bmw", "chevy", "dodge"]
            }
          },
          components: [
            {
              _type: "TypeaheadConfiguration",
              label: "Car brands:",
              keepInStore: true,
              optionsObservable: "cars",
              selectionObservable: "selected_car"
            },
            {
              _type: "PlaceholderConfig",
              text: "I drive: ",
              consumingObservables: {
                value: "selected_car",
              }
            }
          ]
        }
      ]
    }
    this.config = constructionService.constructFrom(this.raw)
    this.configCode = JSON.stringify(this.raw, null, "  ")
  }
}


