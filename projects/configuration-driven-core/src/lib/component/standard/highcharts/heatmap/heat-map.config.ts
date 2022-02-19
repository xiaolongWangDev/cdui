import {ComponentConfiguration} from "../../../base/component-configuration";
import {HeatMapComponent} from "./heat-map.component";


export class HeatMapConfig extends ComponentConfiguration<HeatMapComponent<any>, {}, { data: string }> {
  title?: string;
  xTittle?: string;
  yTittle?: string;

  constructor(args: Omit<HeatMapConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: HeatMapComponent});
  }
}
