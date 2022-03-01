import {ComponentConfiguration} from "configuration-driven-core";
import {SplineComponent} from "./spline.component";


export class SplineConfig extends ComponentConfiguration<SplineComponent<any>, {}, ["data"]> {
  title?: string;
  xTittle?: string;
  yTittle?: string;

  constructor(args: Omit<SplineConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: SplineComponent});
  }
}
