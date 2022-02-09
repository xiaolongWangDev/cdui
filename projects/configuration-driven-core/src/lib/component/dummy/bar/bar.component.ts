import {ConfigurationDrivenComponent} from "../../base/configuration-driven-component";
import {BarConfiguration} from "./bar.config";
import {Component} from "@angular/core";

@Component({
  selector: "cd-bar",
  template: `<div>Bar: {{config.text}}</div>`
})
export class BarComponent extends ConfigurationDrivenComponent<BarConfiguration>{
}
