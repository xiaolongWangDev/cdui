import {ComponentConfiguration} from "../../../base/component-configuration";
import {ScatterComponent} from "./scatter.component";


export class ScatterConfig extends ComponentConfiguration<ScatterComponent<any>, {}, ["data"]> {
  title?: string;
  xTittle?: string;
  yTittle?: string;

  constructor(args: Omit<ScatterConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: ScatterComponent});
  }
}
