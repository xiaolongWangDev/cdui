import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {SplineComponent} from "./spline.component";


export class SplineConfig extends ComponentConfiguration<SplineComponent<any>> {
  title?: string;
  xTittle?: string;
  yTittle?: string;
  public readonly consumingObservables: ConsumeType<["data"]>;

  constructor(args: Omit<SplineConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: SplineComponent});
  }
}
