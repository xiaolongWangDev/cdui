import {ComponentConfiguration, ConsumeType, ExcludedAttributes} from "configuration-driven-core";
import {HeatMapComponent} from "./heat-map.component";


export class HeatMapConfig extends ComponentConfiguration<HeatMapComponent<any>> {
  title?: string;
  xTittle?: string;
  yTittle?: string;
  public readonly consumingObservables: ConsumeType<["data"]>;

  constructor(args: Omit<HeatMapConfig, ExcludedAttributes>) {
    super();
    Object.assign(this, {...args, componentType: HeatMapComponent});
  }
}
