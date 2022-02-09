import {ComponentConfiguration} from "../../base/component-configuration";
import {BarComponent} from "./bar.component";

export class BarConfiguration extends ComponentConfiguration<BarComponent> {
  constructor(public readonly text: string) {
    super(BarComponent);
  }
}
