import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {standard_page_template} from "../components/page/page.component";
import {TypeaheadConfiguration} from "../components/typeahead/typeahead.config";
import {BlockConfiguration} from "../components/block/block.config";
import {StoreConfiguration} from "../../../../configuration-driven-core/src/lib/component/store/store.config";

@Component({
  template: standard_page_template
})
export class DemoTypeaheadPageComponent {
  config = demo_typeahead_conf;
}

const demo_typeahead_conf = new PageConfiguration({
  title: "Typeahead",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
        <p>Based on ng-bootstrap typeahead component.</p>`
    }),
    new BlockConfiguration({
        store: new StoreConfiguration({
          states: {
            "selected_car": null,
            "cars": ["audi", "bmw", "chevy", "dodge"]
          }
        }),
        components: [
          new TypeaheadConfiguration({
              label: "Car brands:",
              keepInStore: true,
              optionsObservable: "cars",
              selectionObservable: "selected_car"
            }
          ),
          new PlaceholderConfig({
            text: "I drive: ",
            consumingObservables: {
              value: "selected_car",
            }
          })
        ]
      }
    ),
  ]
});



