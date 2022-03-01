import {SpendingHeatMapComponent} from "./spending-heat-map.component";
import {HeatMapConfig} from "../highcharts/heatmap/heat-map.config";

export class SpendingHeatMapConfig extends HeatMapConfig {
  constructor(args: Omit<SpendingHeatMapConfig, "componentType">) {
    super(args);
    Object.assign(this, {...args, componentType: SpendingHeatMapComponent});
  }
}
