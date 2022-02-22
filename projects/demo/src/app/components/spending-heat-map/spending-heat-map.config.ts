import {HeatMapConfig} from "configuration-driven-core";
import {SpendingHeatMapComponent} from "./spending-heat-map.component";

export class SpendingHeatMapConfig extends HeatMapConfig {
  constructor(args: Omit<SpendingHeatMapConfig, "componentType">) {
    super(args);
    Object.assign(this, {...args, componentType: SpendingHeatMapComponent});
  }
}
