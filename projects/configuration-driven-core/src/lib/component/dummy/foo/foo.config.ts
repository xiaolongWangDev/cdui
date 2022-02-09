import {ComponentConfiguration} from "../../base/component-configuration";
import {FooComponent} from "./foo.component";

export class FooConfiguration extends ComponentConfiguration<FooComponent> {
  constructor(public readonly text: string) {
    super(FooComponent);
  }
}
