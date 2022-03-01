import {ComponentConfiguration} from "configuration-driven-core";
import {HeatMapComponent} from "./heat-map.component";


export class HeatMapConfig extends ComponentConfiguration<HeatMapComponent<any>, {}, ["data"]> {
  title?: string;
  xTittle?: string;
  yTittle?: string;

  constructor(args: Omit<HeatMapConfig, "componentType">) {
    super();
    Object.assign(this, {...args, componentType: HeatMapComponent});
  }
}
