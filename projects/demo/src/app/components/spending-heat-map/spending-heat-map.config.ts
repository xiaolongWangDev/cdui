import {SpendingHeatMapComponent} from "./spending-heat-map.component";
import {HeatMapConfig} from "../highcharts/heatmap/heat-map.config";
import {ExcludedAttributes} from "configuration-driven-core";

export class SpendingHeatMapConfig extends HeatMapConfig {
  constructor(args: Omit<SpendingHeatMapConfig, ExcludedAttributes>) {
    super(args);
    Object.assign(this, {...args, componentType: SpendingHeatMapComponent});
  }
}
