import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {ScatterComponent} from "./scatter.component";


export class ScatterConfig extends ComponentConfiguration<ScatterComponent<any>> {
  title?: string;
  xTittle?: string;
  yTittle?: string;
  public readonly consumingObservables: ConsumeType<["data"]>;
  constructor(args: Omit<ScatterConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: ScatterComponent});
  }
}
