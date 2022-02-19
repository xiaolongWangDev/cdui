import {AnyComponentConfiguration} from "../../../model/types";
import {ComponentConfiguration} from "../../base/component-configuration";
import {RowComponent} from "./row.component";


export class RowConfiguration extends ComponentConfiguration<RowComponent, {}, {}> {
  public readonly colWidth: number[];
  public readonly components: AnyComponentConfiguration[];
  constructor(args: Omit<RowConfiguration, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: RowComponent});
    if(this.colWidth.length != this.components.length) {
      throw new Error("colWidth and components must be of the same length");
    }
  }
}
