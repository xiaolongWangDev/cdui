import {ConfigurationDrivenComponent} from "configuration-driven-core";
import {Component} from "@angular/core";
import {PlaceholderConfig} from "./placeholder.config";


@Component({
  selector: "demo-placeholder",
  template: `
    <div class="m-1" style="border:1px solid black;">
      {{config.text}}
    </div>
  `
})
export class PlaceholderComponent extends ConfigurationDrivenComponent<PlaceholderConfig> {
}
