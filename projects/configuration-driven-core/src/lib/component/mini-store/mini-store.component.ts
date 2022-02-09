import {ConfigurationDrivenComponent} from "../base/configuration-driven-component";
import {MiniStoreConfiguration} from "./mini-store.config";
import {Component} from "@angular/core";

@Component({
  selector: "cd-mini-store",
  template: ``
})
export class MiniStoreComponent extends ConfigurationDrivenComponent<MiniStoreConfiguration>{
}
