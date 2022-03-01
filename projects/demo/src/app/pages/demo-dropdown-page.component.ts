import {Component} from '@angular/core';
import {PlaceholderConfig} from "../components/placeholder/placeholder.config";
import {PageConfiguration} from "../components/page/page.config";
import {StoreConfiguration} from "configuration-driven-core";
import {DropdownConfiguration} from "../components/dropdown/dropdown.config";
import {RowConfiguration} from "../components/row/row.config";
import {AlertConfiguration} from "../components/alert/alert.config";
import {standard_page_template} from "../components/page/page.component";

@Component({
  template: standard_page_template
})
export class DemoDropdownPageComponent {
  config = demo_dropdown_conf;
}

const demo_dropdown_conf = new PageConfiguration({
  title: "Dropdown",
  components: [
    new AlertConfiguration({
      type: "success",
      htmlContent: `
               <p>The dropdown component consumes the options as an observable from the outside.
               And it yields an observable of the selected value.</p>
               <p>The underlying SingleSelectModel is a good abstraction that can easily handle
               a more complex model. For simplicity this reference implementation just used string.
               One can simply create another Model class extending SingleSelectModel
               (provide its own logic of label rendering, equality check, and default value logic).
                Then create a custom dropdown component using that model.
               </p>
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



