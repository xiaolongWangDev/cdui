import {ConfigurationDrivenComponent} from "../../base/configuration-driven-component";
import {Component} from "@angular/core";
import {FooConfiguration} from "./foo.config";

@Component({
  selector: "cd-foo",
  template: `<div>Foo: {{config.text}}</div>`
})
export class FooComponent extends ConfigurationDrivenComponent<FooConfiguration>{
}
